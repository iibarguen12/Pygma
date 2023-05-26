import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/contexts/auth-context';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const { isAuthenticated, signIn, signUp, signOut } = useContext(AuthContext);

  // Refresh the token every 25 minutes
  useEffect(() => {
    if (isAuthenticated) {
      const refreshTimeout = 25 * 60 * 1000; // 25 minutes
      let refreshTokenTimeoutId;
      const refreshToken = async () => {
        try {
          const refreshToken = Cookies.get('refreshToken');

          const response = await fetch('http://localhost:8080/api/v1/auth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (response.ok) {
            const { token, refreshToken } = await response.json();
            Cookies.set('jwt', token);
            Cookies.set('refreshToken', refreshToken);
          } else {
            // Handle refresh token failure
            console.error('Refresh token failed');
            signOut(); // Optionally sign out the user on refresh token failure
          }
        } catch (error) {
          // Handle refresh token error
          console.error('Refresh token error:', error);
          signOut(); // Optionally sign out the user on refresh token error
        }
      };

      const resetRefreshTimeout = () => {
        clearTimeout(refreshTokenTimeoutId);
        refreshTokenTimeoutId = setTimeout(() => {
          refreshToken();
          resetRefreshTimeout();
        }, refreshTimeout);
      };

      // Start the initial refresh timeout
      resetRefreshTimeout();

      // Clean up refresh timeout on unmount
      return () => {
        clearTimeout(refreshTokenTimeoutId);
      };

    }
  }, [signOut]);

  // Logout the user after 15 minutes of inactivity
  useEffect(() => {
    const inactivityTimeout = 15 * 60 * 1000; // 15 minutes
    let inactivityTimeoutId;

    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeoutId);
      inactivityTimeoutId = setTimeout(() => {
        if (isAuthenticated) {
          signOut();
        }
      }, inactivityTimeout);
    };

    const handleActivity = () => {
      resetInactivityTimeout();
    };

    // Attach event listeners for activity detection
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Start the initial inactivity timeout
    resetInactivityTimeout();

    // Clean up event listeners on unmount
    return () => {
      clearTimeout(inactivityTimeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isAuthenticated, signOut]);

  return { isAuthenticated, signIn, signUp, signOut };
};
