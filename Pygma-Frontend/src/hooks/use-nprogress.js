import { useEffect } from 'react';
import Router from 'next/router';
import nProgress from 'nprogress';

export function useNProgress() {
  useEffect(() => {
    nProgress.configure({
      showSpinner: false, // Disable the spinner (if not needed)
      speed: 500, // Adjust the animation speed (default: 200)
      minimum: 100, // Increase the minimum display time (default: 300)
    });

    const handleRouteChange = () => {
      nProgress.start();
    };

    Router.events.on('routeChangeStart', handleRouteChange);
    Router.events.on('routeChangeError', nProgress.done);
    Router.events.on('routeChangeComplete', nProgress.done);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
      Router.events.off('routeChangeError', nProgress.done);
      Router.events.off('routeChangeComplete', nProgress.done);
    };
  }, []);
}
