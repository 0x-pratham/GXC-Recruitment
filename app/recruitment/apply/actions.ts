// app/recruitment/apply/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { applicationSchema, type ApplicationFormValues } from "@/lib/validations/recruitment";

export async function submitApplication(data: ApplicationFormValues) {
  try {
    // 1. Strict Server-Side Validation
    const validatedData = applicationSchema.parse(data);

    // 2. Initialize the Supabase Server Client
    const supabase = await createClient();

    // 3. Insert into PostgreSQL
    const { error } = await supabase
      .from("applications")
      .insert({
        full_name: validatedData.fullName,
        email: validatedData.email,
        institution: validatedData.institution,
        year_of_study: validatedData.year,
        track: validatedData.track,
        portfolio_url: validatedData.portfolioUrl || null,
        why_join: validatedData.whyJoin,
      });

    if (error) {
      console.error("Database Error:", error.message);
      return { 
        success: false, 
        error: "We encountered an issue saving your application. Please try again." 
      };
    }

    return { success: true };
    
  } catch (error) {
    console.error("Validation/Server Error:", error);
    return { 
      success: false, 
      error: "Invalid data submitted. Please check your form and try again." 
    };
  }
}