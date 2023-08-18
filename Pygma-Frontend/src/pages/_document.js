import { Children, useContext } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import { ThemeContext } from '/src/pages/_app';

const Favicon = () => {
  const isDarkTheme = useContext(ThemeContext);
  const theme = isDarkTheme ? 'dark' : 'light';

  const logoPath = theme === 'dark' ? '/icon/logo-pygma-p-white.ico' : '/icon/logo-pygma-p-black.ico';
  const image16 = theme === 'dark' ? '/icon/logo-pygma-p-white-16x16.png' : '/icon/logo-pygma-p-black-16x16.png';
  const image32 = theme === 'dark' ? '/icon/logo-pygma-p-white-32x32.png' : '/icon/logo-pygma-p-black-32x32.png';

  return (
    <>
      <link rel="icon" href={logoPath} />
      <link rel="icon" type="image/png" sizes="32x32" href={image32} />
      <link rel="icon" type="image/png" sizes="16x16" href={image16} />
    </>
  );
};

const Fonts = () => (
  <>
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
    />
  </>
);

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
          <Fonts />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
