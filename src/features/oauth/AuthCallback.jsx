import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const savedState = localStorage.getItem("oauth_state");

      console.log("Returned state:", returnedState);
      console.log("Saved state:", savedState);

      if (!code || !returnedState) {
        alert("Missing code or state — cannot authenticate");
        navigate("/");
        return;
      }

      if (returnedState !== savedState) {
        alert("State mismatch — possible CSRF attack.");
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://10.0.0.16:3001/auth/reddit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            redirect_uri: "http://10.0.0.16:5173/auth/callback",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const { access_token, refresh_token } = data;

        if (!access_token) {
          throw new Error("No access token received");
        }

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.removeItem("oauth_state");

        navigate("/");
      } catch (err) {
        alert(`Auth failed: ${err.message}`);
        navigate("/");
      }
    }

    fetchToken();
  }, [navigate]);

  return <div>Authenticating with Reddit...</div>;
}
