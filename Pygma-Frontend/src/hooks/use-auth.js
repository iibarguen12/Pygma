import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/contexts/auth-context';

export const useAuth = () => {
  const { isAuthenticated, signIn, signUp, signOut } = useContext(AuthContext);

  // Logout the user after a specified duration of inactivity
  useEffect(() => {
    const inactivityTimeout = 15 * 60 * 1000; // 15 minutes
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (isAuthenticated) {
          signOut();
        }
      }, inactivityTimeout);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    // Attach event listeners for activity detection
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Start the initial timeout
    resetTimeout();

    // Clean up event listeners on unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [ isAuthenticated, signIn, signUp, signOut ]);

  return { isAuthenticated, signIn, signUp, signOut };
};
