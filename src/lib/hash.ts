import { createHash } from "node:crypto";

/** One-way hash so raw IP addresses are never stored. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}
