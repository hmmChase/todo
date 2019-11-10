/* eslint-disable react/no-danger */

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GlobalStyle from '../public/static/styles/global.style';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '----------_document GIP----------',
        new Date().getMilliseconds()
      );
    }

    // https://github.com/zeit/next.js/tree/canary/examples/with-styled-components
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    // Render app and page and get the context of the page with collected side effects
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(
              <>
                <GlobalStyle />
                <App {...props} />
              </>
            )
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '----------_document render----------',
        new Date().getMilliseconds()
      );
    }

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />

          {/* SEO */}
          <meta
            name="description"
            content="An example CRUD app with user authentication."
          />

          {/* Responsive */}
          <meta
            name="viewport"
            content="
              width=device-width,
              height=device-height,
              initial-scale=1,
              minimum-scale=1,
              maximum-scale=1,
              user-scalable=0,
              shrink-to-fit=no"
          />

          {/* Favicon */}
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/favicon.ico"
          />

          {/* PWA images */}
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/android-36x36.png"
            sizes="36x36"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/android-48x48.png"
            sizes="48x48"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/android-72x72.png"
            sizes="72x72"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/android-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/android-144x144.png"
            sizes="144x144"
          />
          <link
            rel="apple-touch-icon"
            href="/static/images/pwa/apple-touch-icon-180x180.png"
            sizes="180x180"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/pwa-192x192.png"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/pwa/pwa-512x512.png"
            sizes="512x512"
          />

          {/* Fonts */}
          <link
            rel="preload"
            href="/static/fonts/open-sans-v15-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/fonts/play-v10-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Progressive Web App Manifest + Theme Color */}
          <link rel="manifest" href="/public/static/manifest.json" />
          <meta name="theme-color" content="#477CBF" />

          {/* Fixes flash of unstyled content for first load (Chromium bug)
            https://github.com/ant-design/ant-design/issues/16037
            Not only antd, but also any other style if you want to use ssr */}
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
                *, *::before, *::after {
                transition: none !important;
                }
              `
            }}
          />
        </Head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
