import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = createAdminClient();
    const [girls, boys] = await Promise.all([
      (supabase.from("applications") as any).select("id", { count: "exact", head: true }).eq("gender", "female"),
      (supabase.from("applications") as any).select("id", { count: "exact", head: true }).eq("gender", "male"),
    ]);

    if (girls.error || boys.error) {
      console.error("Recruitment seat count error:", girls.error ?? boys.error);
      return NextResponse.json({ error: "Unable to load seat counts." }, { status: 500 });
    }

    return NextResponse.json(
      { girls: girls.count ?? 0, boys: boys.count ?? 0, updatedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
    );
  } catch (error) {
    console.error("Recruitment seat count error:", error);
    return NextResponse.json({ error: "Unable to load seat counts." }, { status: 500 });
  }
}
