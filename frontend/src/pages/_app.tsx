// https://nextjs.org/docs/advanced-features/custom-app
// https://github.com/vercel/next.js/tree/master/examples/with-styled-components

/** import order
react=>next=>apollo=>other=>styled

alphabetize local imports
*/

import { ReactElement, ReactNode, StrictMode } from 'react';
import App, { AppContext, AppPropsWithLayout } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import { siteTitle } from '../constants/config';
import { useApollo } from '../graphql/apolloClient';
import GlobalStyle from '../styles/global';
import reportWebVitals from '../reportWebVitals';
import theme from '../styles/theme';
import UserProvider from '../context/User';
import verifyUser from '../utils/verifyUser';

const MyApp = ({ Component, pageProps, user }: AppPropsWithLayout) => {
  // console.log('MyApp user:', user);

  const apolloClient = useApollo(pageProps);

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page: ReactElement) => page as ReactNode);

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
          content='minimum-scale=1, initial-scale=1, width=device-width'
          name='viewport'
        />
      </Head>

      <StrictMode>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <UserProvider currentUser={user}>
              <GlobalStyle />

              {getLayout(<Component {...pageProps} />)}
            </UserProvider>
          </ThemeProvider>
        </ApolloProvider>
      </StrictMode>
    </>
  );
};

//? if on server, verify user
// if (typeof window === 'undefined') {
//   MyApp.getInitialProps = async (appContext: AppContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     // https://github.com/vercel/next.js/discussions/10874
//     const userCookie = appContext.ctx.req?.headers.cookie;

//     const user = verifyUser(userCookie);

//     return { user, ...appProps };
//   };
// }

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//

// Called client-side on:
// - page navigation

// Called server-side on:
// - initial page load

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const server = typeof window === 'undefined';

  // console.log('getInitialProps server:', server);

  // https://github.com/vercel/next.js/discussions/10874
  // If on server, verify user
  if (server) {
    console.log('getInitialProps cookies:', appContext?.ctx?.req?.cookies);

    // Req is only available on server
    const userCookie = appContext.ctx.req?.headers.cookie;

    // console.log('getInitialProps userCookie:', userCookie);

    const user = verifyUser(userCookie);

    // console.log('getInitialProps user:', user);

    return { user, ...appProps };
  }

  return { ...appProps };
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default MyApp;
