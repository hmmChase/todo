// https://nextjs.org/docs/advanced-features/custom-app
// https://github.com/vercel/next.js/tree/master/examples/with-styled-components

/** import order
react=>proptype=>next=>apollo=>styled=>other

config=>utils=>graphql=>other=>components
*/

import { StrictMode, ReactNode } from 'react';
import type { MyAppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import { siteTitle } from '../constants/config';
import { useApollo } from '../graphql/apolloClient';
import reportWebVitals from '../reportWebVitals';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const MyApp = (props: MyAppProps): JSX.Element => {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps);

  // console.log('apolloClient cache: ', apolloClient.cache.data.data);

  // Use the layout defined at the page level, if available
  // https://github.com/vercel/next.js/tree/canary/examples/layout-component
  const getLayout =
    Component.getLayout || ((page: ReactNode): ReactNode => page);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>

        {/* <meta name='og:title' content={siteTitle} />

      <meta
        property='og:image'
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      /> */}

        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <StrictMode>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />

            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </ApolloProvider>
      </StrictMode>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default MyApp;
