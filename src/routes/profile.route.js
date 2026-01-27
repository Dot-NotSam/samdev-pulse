import { Router } from 'express';
import { getGitHubUserData } from '../services/github.service.js';

const router = Router();

/**
 * Format large numbers (e.g., 1500 -> 1.5k)
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// GET /api/profile?username=octocat
router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'username query parameter is required' });
  }

  // Fetch GitHub data
  const result = await getGitHubUserData(username);

  if (!result.success) {
    return res.status(500).json({ error: result.error });
  }

  const { data } = result;

  const githubStats = [
    { label: 'Followers', value: formatNumber(data.followers) },
    { label: 'Repositories', value: formatNumber(data.publicRepos) },
    { label: 'Stars', value: formatNumber(data.totalStars) },
  ];

});

export default router;

