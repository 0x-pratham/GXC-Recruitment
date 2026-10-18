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
