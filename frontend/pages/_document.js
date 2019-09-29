/* eslint-disable react/no-danger */
// https://github.com/zeit/next.js/tree/canary/examples/with-styled-components
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import GlobalStyle from '../styles/global.style';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    console.log('_document GIP', new Date().getMilliseconds());

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

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
    console.log('_document render', new Date().getMilliseconds());

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />

          {/* SEO */}
          <meta name="description" content="" />

          {/* Responsive */}
          <meta
            name="viewport"
            content="
              width=device-width,
              height=device-height,
              initial-scale=1,
              minimum-scale=1,
              user-scalable=0,
              shrink-to-fit=no"
          />

          {/* Favicon */}
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />

          {/* Webfonts */}
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
          <link rel="manifest" href="/static/manifest.json" />
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
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
