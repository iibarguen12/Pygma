import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { sendRequest } from 'src/utils/send-request';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";

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
      const authenticatedUser = JSON.parse(window.sessionStorage.getItem('user'));
      const user = {
        id: authenticatedUser.id,
        avatar: authenticatedUser.imageURL,
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        phone: authenticatedUser.phone,
        city: authenticatedUser.city,
        country: authenticatedUser.country,
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

  const signIn = async (emailOrUsername, password, isGoogleAuth) => {
  try {
      const loginResponse =
      await sendRequest('http://localhost:8080/api/v1/auth/login','POST',
        JSON.stringify({
          username: emailOrUsername,
          password: password,
          isGoogleAuth: isGoogleAuth,
        }),
        false,
      );

      if (loginResponse.ok) {
        const loginResponseData = await loginResponse.json();
        const token = loginResponseData.token;
        const refreshToken = loginResponseData.refreshToken;

        const decodedToken = jwt_decode(token);
        const username = decodedToken.sub;

        Cookies.set('jwt', token);
        Cookies.set('refreshToken', refreshToken);
        window.sessionStorage.setItem('authenticated', 'true');

        const userResponse =
        await sendRequest(`http://localhost:8080/api/v1/users/${username}`,'GET', null);
        const userResponseData = await userResponse.json();
        window.sessionStorage.setItem('user', JSON.stringify(userResponseData));

        const user = {
          id: userResponseData.id,
          avatar: userResponseData.imageURL,
          name: userResponseData.name,
          email: userResponseData.email
        };

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });

        return null;
      } else {
        const loginResponseError = await loginResponse.json();
        return loginResponseError.message;
      }
    } catch (err) {
      console.error(err);
      return 'An error occurred during sign-in';
    }
  };

  const signUp = async (username, name, lastname, email, isGoogleAuth, imageURL) => {
    try {
      const signupResponse =
      await sendRequest('http://localhost:8080/api/v1/auth/signup','POST',
          JSON.stringify({
          username: username,
          name: name,
          lastname: lastname,
          email: email,
          isGoogleAuth: isGoogleAuth,
          imageURL: imageURL,
        }),
        false,
      );

      if (signupResponse.ok) {
        return null;
      } else {
        const signupResponseError = await signupResponse.json();
        return signupResponseError.message;
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
