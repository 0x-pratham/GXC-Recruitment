// app/recruitment/apply/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { applicationSchema, type ApplicationFormValues } from "@/lib/validations/recruitment";
import { RECRUITMENT_OPEN } from "@/lib/recruitment-config";

export async function submitApplication(data: ApplicationFormValues) {
  if (!RECRUITMENT_OPEN) {
    return { success: false, error: "Recruitment is currently closed. Please check back for the next announcement." };
  }

  try {
    const validatedData = applicationSchema.parse(data);
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user || !user.email) {
      return { success: false, error: "Please sign in with Google before submitting your application." };
    }

    if (validatedData.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
      return { success: false, error: "Use the email address associated with your signed-in Google account." };
    }

    // Friendly pre-check; the database unique index below remains the source of truth
    // and closes the race where two requests arrive at the same time.
    const { data: existingApplication, error: lookupError } = await supabase
      .from("applications")
      .select("id")
      .ilike("email", user.email)
      .maybeSingle();

    if (lookupError) {
      console.error("Existing application lookup failed:", lookupError.message);
      return { success: false, error: "We couldn't verify whether you've already applied. Please refresh the page and try again." };
    }

    if (existingApplication) {
      return { success: false, error: "You've already submitted an application. Your application status is available on this page." };
    }

    const { error } = await (supabase.from("applications") as any).insert({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      institution: validatedData.institution,
      phone: validatedData.phone,
      email: user.email,
      prn_number: validatedData.prnNumber,
      gender: validatedData.gender,
      year_of_study: validatedData.year,
      track: validatedData.track ?? null,
      portfolio_url: validatedData.portfolioUrl || null,
      why_join: validatedData.whyJoin,
    });

    if (error) {
      const databaseError = `${error.message ?? ""} ${error.details ?? ""}`;

      if (databaseError.includes("APPLICATION_CAPACITY_FULL_FEMALE")) {
        return {
          success: false,
          error: "We're sorry, all 25 seats for female applicants are now filled. No vacancies remain in this category. Thank you for your interest in GenXCode.",
        };
      }

      if (databaseError.includes("APPLICATION_CAPACITY_FULL_MALE")) {
        return {
          success: false,
          error: "We're sorry, all 16 seats for male applicants are now filled. No vacancies remain in this category. Thank you for your interest in GenXCode.",
        };
      }

      if (databaseError.includes("APPLICATION_GENDER_REQUIRED")) {
        return { success: false, error: "Please select your gender before submitting your application." };
      }

      if (error.code === "23505") {
        return { success: false, error: "You've already submitted an application. You can check its status on the application page." };
      }

      console.error("Database Error:", error.message, error.details);
      return { success: false, error: "We encountered an issue saving your application. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Validation/Server Error:", error);
    return { success: false, error: "Invalid data submitted. Please check your form and try again." };
  }
}
