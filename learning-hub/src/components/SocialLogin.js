// src/components/SocialLogin.js
import React from 'react';

const SocialLogin = () => {
  return (
    <div className="social-login">
      <p>or continue with</p>
      <div className="social-buttons">
        <button className="social-btn google">Google</button>
        <button className="social-btn github">GitHub</button>
        <button className="social-btn facebook">Facebook</button>
      </div>
    </div>
  );
};

export default SocialLogin;
