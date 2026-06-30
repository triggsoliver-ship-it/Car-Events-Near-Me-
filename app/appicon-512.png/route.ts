import { iconResponse } from "@/lib/appIcon";

export const dynamic = "force-static";

// 512x512 PNG icon for the web manifest (maskable + splash screen).
export function GET() {
  return iconResponse(512);
}
