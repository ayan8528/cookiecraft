// api/auth.js
// Vercel serverless endpoint for Decap (Netlify) / GitHub OAuth exchange.
// Uses global fetch (no extra npm packages required).

export default async function handler(req, res) {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return res.status(500).json({ error: "Server missing GitHub OAuth credentials" });
  }

  // If path is /api/auth -> redirect user to GitHub authorize screen
  // If path is /api/auth/callback -> exchange code for access_token and return it to client
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    if (!url.pathname.endsWith("/callback")) {
      // Redirect to GitHub auth page
      const redirectUri = `${req.headers.origin}/api/auth/callback`;
      const githubAuth = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`;
      return res.writeHead(302, { Location: githubAuth }).end();
    }

    // callback: exchange code for token
    const code = url.searchParams.get("code");
    if (!code) return res.status(400).send("Missing code");

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code
      })
    });

    const tokenData = await tokenRes.json();
    // Example tokenData: { access_token: "...", token_type: "bearer", scope: "repo" }

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error, description: tokenData.error_description });
    }

    // Return token JSON directly to the client (Decap CMS expects JSON with access_token)
    return res.status(200).json(tokenData);
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
