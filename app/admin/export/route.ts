import { NextResponse } from "next/server";
import { getAdminClientIfAuthorized } from "@/lib/recruitment-settings";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = value == null ? "" : value instanceof Object ? JSON.stringify(value) : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const context = await getAdminClientIfAuthorized();
  if (!context) return new NextResponse("Unauthorized", { status: 401 });

  const columns = [
    "id", "created_at", "first_name", "last_name", "email", "phone",
    "prn_number", "gender", "institution", "year_of_study", "track",
    "portfolio_url", "why_join", "status",
  ];
  const allRows: Record<string, unknown>[] = [];
  const pageSize = 1000;
  for (let start = 0; ; start += pageSize) {
    const { data, error } = await context.admin
      .from("applications")
      .select(columns.join(","))
      .order("created_at", { ascending: true })
      .range(start, start + pageSize - 1);
    if (error) {
      console.error("CSV export failed:", error.message);
      return new NextResponse("Could not export applications", { status: 500 });
    }
    allRows.push(...(data ?? []) as Record<string, unknown>[]);
    if (!data || data.length < pageSize) break;
  }

  const lines = [
    columns.map(csvCell).join(","),
    ...allRows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ];
  const body = "\uFEFF" + lines.join("\r\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="genxcode-recruitment-applications.csv"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
