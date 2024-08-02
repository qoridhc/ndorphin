import React, { useEffect } from "react";

interface LoginPageProps {
  accessToken: string;
  refreshToken: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ accessToken, refreshToken }) => {
  useEffect(() => {
    const message = {
      code: 'SU',
      message: 'Success',
      data: {
        userId: 1,
        accessToken,
        refreshToken,
      },
    };

    if (window.opener) {
      window.opener.postMessage(message, '*');
    }

    window.close();
  }, [accessToken, refreshToken]);
  
  return (
    <div></div>
  );
};

export default LoginPage;