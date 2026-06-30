import { iconResponse } from "@/lib/appIcon";

export const dynamic = "force-static";

// 192x192 PNG icon for the web manifest (Android/Chrome installability).
export function GET() {
  return iconResponse(192);
}
