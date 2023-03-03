import { Fragment } from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

// https://nextjs.org/docs/advanced-features/custom-document
// https://github.com/vercel/next.js/tree/canary/examples/with-styled-components

// Resolution order

// On the server:
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. document.getInitialProps
// 4. app.render
// 5. page.render
// 6. document.render

// On the server with error:
// 1. document.getInitialProps
// 2. app.render
// 3. page.render
// 4. document.render

// On the client
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. app.render
// 4. page.render

class MyDocument extends Document {
  // `getInitialProps` belongs to `_document` (instead of `_app`)
  // It's compatible with server-side generation (SSG)
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;

    try {
      // Run the React rendering logic synchronously
      ctx.renderPage = () =>
        // Render app and page to get the context of the page with collected side effects
        originalRenderPage({
          // Retrieve styles from components in the page
          // collectStyles wraps your element in a provider
          // enhanceApp useful for wrapping the whole react tree
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),

          // Useful for wrapping in a per-page basis
          enhanceComponent: Component => Component
        });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,

        // Extract the styles as <style> tags using getStyleElement
        // getStyleElement returns an array of React elements
        // Pass styleTags as a prop
        // Styles fragment is rendered after the app and page rendering finish
        styles: [
          <Fragment key={1}>
            {initialProps.styles}

            {sheet.getStyleElement()}
          </Fragment>
        ]
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />

          {/* SEO */}

          <meta content='hmmStart' name='description' />

          {/* Favicon */}

          <link
            href='/images/favicon.ico'
            rel='shortcut icon'
            type='image/x-icon'
          />

          {/* Progressive Web App Manifest + Theme Color */}

          <meta content='#000' name='theme-color' />
          <link href='manifest.json' rel='/manifest' />

          {/* Fonts */}

          <link
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            rel='stylesheet'
          />

          <link
            as='font'
            crossOrigin='anonymous'
            href='/fonts/open-sans-v15-latin-regular.woff2'
            rel='preload'
            type='font/woff2'
          />

          <link
            as='font'
            crossOrigin='anonymous'
            href='/fonts/play-v10-latin-regular.woff2'
            rel='preload'
            type='font/woff2'
          />

          {/* PWA images */}

          <link
            href='/images/pwa/android-36x36.png'
            rel='icon'
            sizes='36x36'
            type='image/png'
          />

          <link
            href='/images/pwa/android-48x48.png'
            rel='icon'
            sizes='48x48'
            type='image/png'
          />

          <link
            href='/images/pwa/android-72x72.png'
            rel='icon'
            sizes='72x72'
            type='image/png'
          />

          <link
            href='/images/pwa/android-96x96.png'
            rel='icon'
            sizes='96x96'
            type='image/png'
          />

          <link
            href='/images/pwa/android-144x144.png'
            rel='icon'
            sizes='144x144'
            type='image/png'
          />

          <link
            href='/images/pwa/apple-touch-icon-180x180.png'
            rel='apple-touch-icon'
            sizes='180x180'
          />

          <link
            href='/images/pwa/pwa-192x192.png'
            rel='icon'
            sizes='192x192'
            type='image/png'
          />

          <link
            href='/images/pwa/pwa-512x512.png'
            rel='icon'
            sizes='512x512'
            type='image/png'
          />
        </Head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>

          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
