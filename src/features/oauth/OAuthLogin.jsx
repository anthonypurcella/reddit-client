import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function OAuthLogin() {

  useEffect(() => {
    const REDDIT_CLIENT_ID = "2kkAY4bvgmtuHpKAdruepw";
    const REDIRECT_URI =
      "https://redditminimal-client.netlify.app/auth/callback";
    const SCOPE = "identity read vote submit mysubreddits";
    const STATE = uuidv4();

    // Store state to validate later
    localStorage.setItem("oauth_state", STATE);
    console.log(localStorage.getItem("oauth_state"));

    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&duration=permanent&scope=${SCOPE}`;

    window.location.href = redditAuthUrl;
  }, []);

  return <div>Redirecting to Reddit...</div>;
}
