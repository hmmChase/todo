// https://nextjs.org/docs/advanced-features/custom-document

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with server-side generation (SSG).
  static async getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // enhanceApp wraps the whole react tree
          // collectStyles wraps your element in a provider
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,

        // Styles fragment is rendered after the app and page rendering finish.
        // getStyleElement returns an array of React elements
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
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />

          <meta name='description' content='hmmStart' />

          {/* <meta name='twitter:card' content='summary_large_image' /> */}

          {/* <link rel='icon' href='/favicon.ico' /> */}

          <link rel='/manifest' href='manifest.json' />

          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
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
