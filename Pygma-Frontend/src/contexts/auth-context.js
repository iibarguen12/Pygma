import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-pygma.png',
        name: 'Pygma Lion',
        email: 'lion@pygma.co'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (emailOrUsername, password) => {
  try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: emailOrUsername,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // TODO Save the token or perform further actions with it For example, you can store it in localStorage or pass it to an authentication context
        console.log('JWT token:', token);
        window.sessionStorage.setItem('authenticated', 'true');

        const user = {
          id: '5e86809283e28b96d2d38537',
          avatar: '/assets/avatars/avatar-pygma.png',
          name: 'Pygma Lion',
          email: 'lion@pygma.co'
        };

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });

        return null;
      } else {
        const data = await response.json();
        return data.message;
      }
    } catch (err) {
      console.error(err);
      return 'An error occurred during sign-in';
    }
  };

  const signUp = async (username, name, lastname, email) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          name: name,
          lastname: lastname,
          email: email,
        }),
      });

      if (response.ok) {
        return null;
      } else {
        const data = await response.json();
        return data.message;
      }
    } catch (err) {
      console.error(err);
      return 'An error occurred during sign-up';
    }
  };

  const signOut = () => {
    // Clear cookies
    document.cookie = 'cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Clear session storage
    sessionStorage.clear();

    // Dispatch an action to update the authentication state
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
