import { Router } from 'express';

const router = Router();

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

});

export default router;

