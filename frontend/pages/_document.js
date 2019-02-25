import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GlobalStyle from '../styles/global.style';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
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
          <link
            rel="preload"
            href="/static/favicon.ico"
            as="image"
            crossOrigin="anonymous"
            onLoad="this.rel='shortcut icon'"
          />
          <link
            rel="preload"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            as="style"
            crossOrigin="anonymous"
            onLoad="this.rel='stylesheet'"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab:700"
            as="font"
            crossOrigin="anonymous"
            onLoad="this.rel='stylesheet'"
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
