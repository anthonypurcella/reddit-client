async function getValidAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const tokenExpiry = localStorage.getItem("token_expiry"); // timestamp when token expires

  if (!accessToken || !refreshToken) {
    throw new Error("No tokens available");
  }

  const now = Date.now();

  // If token is still valid (say, has 1 minute or more before expiry), just return it
  if (tokenExpiry && now < Number(tokenExpiry) - 60 * 1000) {
    return accessToken;
  }

  // Else refresh token
  const response = await fetch("http://localhost:3001/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  const { access_token, expires_in } = data;

  // Save new token and expiry timestamp
  localStorage.setItem("access_token", access_token);
  localStorage.setItem(
    "token_expiry",
    (Date.now() + expires_in * 1000).toString()
  );

  return access_token;
}

export default getValidAccessToken