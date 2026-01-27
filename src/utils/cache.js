// TTL-based in-memory cache

class Cache {
  constructor(defaultTTL = 300000) {
    // Default TTL: 5 minutes (in milliseconds)
    this.defaultTTL = defaultTTL;
    this.store = new Map();
  }

  /**
   * Get a value from cache
   * Returns null if not found or expired
   */
  get(key) {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Set a value in cache with optional TTL
   */
  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + ttl;
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Check if key exists and is not expired
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Delete a key from cache
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Clear all entries from cache
   */
  clear() {
    this.store.clear();
  }

  /**
   * Get cache size
   */
  size() {
    return this.store.size;
  }
}

// Singleton instance for GitHub data cache (5 minute TTL)
export const githubCache = new Cache(300000);

export default Cache;
