/* index */

const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitOwner = process.env.VERCEL_GIT_REPO_OWNER;

export const index = (req, res, next) =>
  res.status(200).json({
    route: 'index',
    frontendUrlPrev: `https://hmmstart-git-${gitBranch}-${gitOwner}.vercel.app`
  });
