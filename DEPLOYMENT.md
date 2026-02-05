## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy this project:

1. **Fork or Clone this repository** to your GitHub account

2. **Create a GitHub Personal Access Token:**
   - Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens)
   - Click **"Generate new token (classic)"**
   - Give it a name (e.g., `samdev-pulse-token`)
   - Select scopes:
     - ✅ `public_repo` (for public repository data)
     - ✅ `read:user` (for user profile data)
   - Click **"Generate token"** and copy it immediately

3. **Deploy to Vercel:**
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **"Import Project"** or **"Add New → Project"**
   - Select your forked repository
   - Configure project:
     - **Framework Preset:** Other
     - **Build Command:** (leave empty)
     - **Output Directory:** (leave empty)
     - **Install Command:** `npm install`

4. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add the following:
     ```
     GITHUB_TOKEN=your_github_personal_access_token
     NODE_ENV=production
     DEFAULT_USERNAME=octocat
     ```

5. **Deploy!**
   - Click **"Deploy"**
   - Wait for build to complete (~1-2 minutes)
   - Your API will be live at: `https://your-project.vercel.app/api/profile`

6. **Test your deployment:**
   ```
   https://your-project.vercel.app/api/profile?username=YOUR_USERNAME
   ```

---