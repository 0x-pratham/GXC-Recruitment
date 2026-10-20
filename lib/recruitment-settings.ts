import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type RecruitmentSettings = {
  opens_at: string | null;
  closes_at: string | null;
  manual_override: "schedule" | "open" | "closed";
  closed_message: string;
};

const DEFAULT_SETTINGS: RecruitmentSettings = {
  opens_at: null,
  closes_at: null,
  manual_override: "schedule",
  closed_message: "Thank you for your interest in GenXCode. Recruitment applications are currently closed. Please check back later for updates.",
};

export async function getRecruitmentSettings(): Promise<RecruitmentSettings> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("recruitment_settings").select("opens_at, closes_at, manual_override, closed_message").eq("id", 1).maybeSingle();
    if (error || !data) return DEFAULT_SETTINGS;
    return {
      opens_at: data.opens_at,
      closes_at: data.closes_at,
      manual_override: data.manual_override as RecruitmentSettings["manual_override"],
      closed_message: data.closed_message,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function isRecruitmentOpen(settings: RecruitmentSettings, now = Date.now()) {
  if (settings.manual_override === "open") return true;
  if (settings.manual_override === "closed") return false;
  const opensAt = settings.opens_at ? new Date(settings.opens_at).getTime() : null;
  const closesAt = settings.closes_at ? new Date(settings.closes_at).getTime() : null;
  if (opensAt !== null && now < opensAt) return false;
  if (closesAt !== null && now >= closesAt) return false;
  return opensAt !== null || closesAt !== null ? true : false;
}

export async function getAdminClientIfAuthorized() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || isAdmin !== true) return null;
  return { user, admin: createAdminClient() };
}
