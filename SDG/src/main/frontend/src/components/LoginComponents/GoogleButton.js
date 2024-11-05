import React from "react";
import GoogleImg from '../../assets/LoginAssets/image/Google.png';
import "./GoogleButton.css";

function GoogleButton() {

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${ process.env.REACT_APP_GOOGLE_CLIENT_ID }
		&redirect_uri=${ process.env.REACT_APP_GOOGLE_REDIRECT_URL  }
		&response_type=token
		&scope=email profile`;
  };

  return (
    <button className="google-btn" onClick = { handleGoogleLogin }>
      <img
        src={GoogleImg}
        alt="Google Icon"
        className="google-icon"
      />
      Sign in with Google
    </button>
  );
}

export default GoogleButton;
