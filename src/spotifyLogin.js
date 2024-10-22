import React, { useState, useEffect } from "react";

const SpotifyLogin = () => {
  const [token, setToken] = useState("");

  const client_id = "144ebf716b5443ef9600a60b86a47ea0"; // Replace with your Client ID
  const redirect_uri = "https://tagggd-spotify.netlify.app/callback"; // Replace with your Redirect URI
  const auth_endpoint = "https://accounts.spotify.com/authorize";
  const response_type = "token";
  const scope = "user-read-currently-playing user-read-playback-state"; // You can modify this scope based on your needs

  const getAuthUrl = () => {
    return `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
  };

  // Function to get the token from the URL after login
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    // Fetch user's top tracks if token exists
    if (token) {
      fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())

        .catch((error) => console.error("Error fetching top tracks:", error));
    }
  }, []);

  // Function to logout by removing the token
  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Spotify API Example</h1>
      {!token ? (
        <a href={getAuthUrl()}>Login to Spotify</a>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      {token && (
        <div>
          <h2>Your Top Tracks</h2>
        </div>
      )}
    </div>
  );
};

export default SpotifyLogin;
