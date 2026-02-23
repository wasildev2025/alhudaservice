/**
 * Simple in-memory sliding-window rate limiter.
 * For production at scale, replace with Redis-based solution.
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const cache = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
        if (now > entry.resetAt) cache.delete(key);
    }
}, 5 * 60 * 1000);

interface RateLimitConfig {
    /** Maximum number of requests allowed */
    limit: number;
    /** Time window in seconds */
    windowSeconds: number;
}

/**
 * Check if a request is rate-limited.
 * @returns `null` if allowed, or a `{ retryAfter }` object if blocked
 */
export function rateLimit(
    identifier: string,
    config: RateLimitConfig = { limit: 5, windowSeconds: 60 }
): { retryAfter: number } | null {
    const now = Date.now();
    const key = identifier;
    const entry = cache.get(key);

    if (!entry || now > entry.resetAt) {
        // First request or window expired — start fresh
        cache.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 });
        return null;
    }

    if (entry.count >= config.limit) {
        // Rate limited
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return { retryAfter };
    }

    // Increment
    entry.count++;
    return null;
}
