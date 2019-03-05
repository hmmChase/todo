import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GlobalStyle from '../styles/global.style';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // https://github.com/zeit/next.js/tree/canary/examples/with-styled-components
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(
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
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="preload"
            href="/static/styles/normalize.css"
            as="style"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/static/styles/normalize.css" crossOrigin="anonymous" />
          <link
            rel="preload"
            href="/static/fonts/open-sans-v15-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
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
