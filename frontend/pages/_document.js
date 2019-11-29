import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GlobalStyle from '../public/styles/global.style';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if (process.env.NODE_ENV === 'development')
      console.log(
        '----------_document GIP----------',
        new Date().getMilliseconds()
      );

    // https://github.com/zeit/next.js/tree/canary/examples/with-styled-components
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    // Step 2: Retrieve styles from components in the page
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

        // Step 3: Extract the styles as <style> tags using getStyleElement
        // Step 4: Pass styleTags as a prop
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
    if (process.env.NODE_ENV === 'development')
      console.log(
        '----------_document render----------',
        new Date().getMilliseconds()
      );

    return (
      <html lang='en'>
        <Head>
          <meta charSet='utf-8' />

          {/* SEO */}
          <meta
            name='description'
            content='An example CRUD app with user authentication.'
          />

          {/* Responsive */}
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          {/* Progressive Web App Manifest + Theme Color */}
          <meta name='theme-color' content='#C8DCF0' />
          <link rel='manifest' href='manifest.json' />

          {/* Favicon */}
          <link
            rel='shortcut icon'
            type='image/x-icon'
            href='images/favicon.ico'
          />

          {/* PWA images */}
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/android-36x36.png'
            sizes='36x36'
          />
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/android-48x48.png'
            sizes='48x48'
          />
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/android-72x72.png'
            sizes='72x72'
          />
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/android-96x96.png'
            sizes='96x96'
          />
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/android-144x144.png'
            sizes='144x144'
          />
          <link
            rel='apple-touch-icon'
            href='images/pwa/apple-touch-icon-180x180.png'
            sizes='180x180'
          />
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/pwa-192x192.png'
            sizes='192x192'
          />
          <link
            rel='icon'
            type='image/png'
            href='images/pwa/pwa-512x512.png'
            sizes='512x512'
          />

          {/* Fonts */}
          <link
            rel='preload'
            href='fonts/open-sans-v15-latin-regular.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='fonts/play-v10-latin-regular.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />

          {/* Fixes flash of unstyled content for first load (Chromium bug)
            https://github.com/ant-design/ant-design/issues/16037
            Not only antd, but also any other style if you want to use ssr */}
          <style
            id='holderStyle'
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
