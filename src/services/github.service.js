// GitHub REST API Service

import { githubCache } from '../utils/cache.js';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Get authorization headers if token is available
 */
function getHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'samdev-pulse',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

/**
 * Fetch user profile from GitHub API
 */
async function fetchUserProfile(username) {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getGitHubUserData(username) {
  // Check cache first
  const cached = githubCache.get(username);
  if (cached) {
    return cached;
  }

  try {
    const [profile, repos] = await Promise.all([
      fetchUserProfile(username),
      fetchUserRepos(username),
    ]);

    const result = {
      success: true,
      data: normalizeUserData(profile, repos),
    };

    // Store in cache
    githubCache.set(username, result);

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch GitHub data',
    };
  }
}

