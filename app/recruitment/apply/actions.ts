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

    const { error } = await (supabase.from("applications") as any).insert({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      phone: validatedData.phone,
      email: user.email,
      prn_number: validatedData.prnNumber,
      gender: validatedData.gender,
      year_of_study: validatedData.year,
      track: validatedData.track,
      portfolio_url: validatedData.portfolioUrl || null,
      why_join: validatedData.whyJoin,
    });

    if (error) {
      console.error("Database Error:", error.message);
      return { success: false, error: "We encountered an issue saving your application. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Validation/Server Error:", error);
    return { success: false, error: "Invalid data submitted. Please check your form and try again." };
  }
}
