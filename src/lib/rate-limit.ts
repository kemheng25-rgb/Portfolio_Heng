export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_SUBMISSIONS = 3;

/** The narrow slice of PrismaClient this check actually depends on. */
export interface RateLimitStore {
  contactSubmission: {
    count(args: {
      where: { ipHash: string; createdAt: { gte: Date } };
    }): Promise<number>;
  };
}

/**
 * Counts recent submissions from the same hashed IP directly in Postgres
 * instead of in-memory, so the limit holds across serverless instances.
 */
export async function isRateLimited(
  prisma: RateLimitStore,
  ipHash: string,
  now: Date = new Date(),
): Promise<boolean> {
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);
  const recentCount = await prisma.contactSubmission.count({
    where: {
      ipHash,
      createdAt: { gte: windowStart },
    },
  });
  return recentCount >= RATE_LIMIT_MAX_SUBMISSIONS;
}
