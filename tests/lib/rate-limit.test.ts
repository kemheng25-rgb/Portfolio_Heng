import { describe, expect, it, vi } from "vitest";

import { RATE_LIMIT_MAX_SUBMISSIONS, isRateLimited } from "@/lib/rate-limit";

function fakePrisma(count: number) {
  return {
    contactSubmission: {
      count: vi.fn().mockResolvedValue(count),
    },
  };
}

describe("isRateLimited", () => {
  it("allows submissions under the limit", async () => {
    const prisma = fakePrisma(RATE_LIMIT_MAX_SUBMISSIONS - 1);
    await expect(isRateLimited(prisma, "hash")).resolves.toBe(false);
  });

  it("blocks submissions at the limit", async () => {
    const prisma = fakePrisma(RATE_LIMIT_MAX_SUBMISSIONS);
    await expect(isRateLimited(prisma, "hash")).resolves.toBe(true);
  });

  it("scopes the count to the same hashed IP", async () => {
    const prisma = fakePrisma(0);
    await isRateLimited(prisma, "some-hash");
    expect(prisma.contactSubmission.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ ipHash: "some-hash" }),
      }),
    );
  });
});
