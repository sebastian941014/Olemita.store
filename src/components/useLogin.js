import { useState, useEffect } from 'react';

const useLogin = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F2') {
        setIsLoginOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return {
    isLoginOpen,
    setIsLoginOpen,
    currentUser,
    handleLogin,
    handleLogout
  };
};

export default useLogin;