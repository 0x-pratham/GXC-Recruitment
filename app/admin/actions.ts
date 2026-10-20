"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = ["pending", "reviewed", "accepted", "rejected"] as const;
type ApplicationStatus = (typeof allowedStatuses)[number];

export async function updateApplicationStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !allowedStatuses.includes(status)) redirect("/admin?error=invalid");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || isAdmin !== true) redirect("/admin/login?error=unauthorized");

  const { error } = await supabase.from("applications").update({ status }).eq("id", id);
  if (error) redirect("/admin?error=update");

  revalidatePath("/admin");
  redirect("/admin?updated=1");
}

export async function adminSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}


function localIstInputToIso(value: string) {
  if (!value) return null;
  // datetime-local has no timezone. Admin inputs are interpreted as India Standard Time.
  const parsed = new Date(`${value}:00+05:30`);
  if (Number.isNaN(parsed.getTime())) throw new Error("Invalid date/time");
  return parsed.toISOString();
}

export async function saveRecruitmentSettings(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || isAdmin !== true) redirect("/admin/login?error=unauthorized");

  const opensRaw = String(formData.get("opens_at") ?? "");
  const closesRaw = String(formData.get("closes_at") ?? "");
  const closedMessage = String(formData.get("closed_message") ?? "").trim();
  let opensAt: string | null;
  let closesAt: string | null;
  try {
    opensAt = localIstInputToIso(opensRaw);
    closesAt = localIstInputToIso(closesRaw);
  } catch {
    redirect("/admin?settings_error=invalid_date");
  }
  if (opensAt && closesAt && new Date(closesAt) <= new Date(opensAt)) redirect("/admin?settings_error=invalid_window");
  if (closedMessage.length < 10 || closedMessage.length > 500) redirect("/admin?settings_error=message");

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const admin = createAdminClient();
  const { error } = await admin.from("recruitment_settings").upsert({
    id: 1,
    opens_at: opensAt,
    closes_at: closesAt,
    closed_message: closedMessage,
    updated_at: new Date().toISOString(),
    updated_by: user.id,
  });
  if (error) {
    console.error("Could not save recruitment settings:", error.message);
    redirect("/admin?settings_error=save");
  }
  revalidatePath("/admin");
  revalidatePath("/recruitment/apply");
  redirect("/admin?settings_saved=1");
}

export async function setRecruitmentOverride(formData: FormData) {
  const override = String(formData.get("override") ?? "");
  if (override !== "schedule" && override !== "open" && override !== "closed") {
    redirect("/admin?settings_error=override");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || isAdmin !== true) redirect("/admin/login?error=unauthorized");

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const admin = createAdminClient();
  const { error } = await admin.from("recruitment_settings").upsert({
    id: 1,
    manual_override: override,
    updated_at: new Date().toISOString(),
    updated_by: user.id,
  });
  if (error) {
    console.error("Could not update recruitment override:", error.message);
    redirect("/admin?settings_error=save");
  }
  revalidatePath("/admin");
  revalidatePath("/recruitment/apply");
  redirect("/admin?settings_saved=1");
}
