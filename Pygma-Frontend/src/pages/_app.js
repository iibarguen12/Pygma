import { createContext, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { useThemeDetector } from 'src/hooks/use-theme';

const ThemeContext = createContext('light');
const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const isDarkTheme = useThemeDetector();
  const [currentTheme, setCurrentTheme] = useState(isDarkTheme ? 'dark' : 'light');
  const theme = createTheme(currentTheme);

  useEffect(() => {
    setCurrentTheme(isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const handleChangeTheme = useCallback((theme) => {
    setCurrentTheme(theme);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Pygma</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeContext.Provider value={{ currentTheme, setCurrentTheme: handleChangeTheme }}>
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? (
                    <SplashScreen />
                  ) : (
                    getLayout(<Component {...pageProps} />)
                  )
                }
              </AuthConsumer>
            </ThemeContext.Provider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export { ThemeContext };
export default App;
