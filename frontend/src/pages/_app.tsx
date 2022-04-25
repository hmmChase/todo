// https://nextjs.org/docs/advanced-features/custom-app
// https://github.com/vercel/next.js/tree/master/examples/with-styled-components

/** import order
react=>next=>apollo=>other=>styled

alphabetize local imports
*/

import {
  ReactElement,
  ReactNode,
  StrictMode
  // useEffect,
  // useState
} from 'react';
import App, { AppContext, AppPropsWithLayout } from 'next/app';
import Head from 'next/head';
import { ApolloProvider, useQuery } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { initializeApollo, addApolloState } from '../graphql/apolloClient';
// import { READ_IDEAS } from '../graphql/queries/idea';

// import { CURRENT_USER } from '../graphql/queries/user';
import { siteTitle } from '../constants/config';
import { useApollo } from '../graphql/apolloClient';
// import coloredLog from '../utils/coloredLog';
import GlobalStyle from '../styles/global';
import reportWebVitals from '../reportWebVitals';
import theme from '../styles/theme';
import UserProvider from '../context/User';
// import verifyUser from '../utils/verifyUser';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // const [user, setUser] = useState(null);

  const apolloClient = useApollo(pageProps);

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page: ReactElement) => page as ReactNode);

  // useEffect(() => {
  // const {
  // data: { user }
  // } = async () => await apolloClient.query({ query: CURRENT_USER });

  //   setUser(user);
  // }, []);

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
            <UserProvider>
              <GlobalStyle />

              {getLayout(<Component {...pageProps} />)}
            </UserProvider>
          </ThemeProvider>
        </ApolloProvider>
      </StrictMode>
    </>
  );
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
// const apolloClient = initializeApollo();

// const res = await apolloClient.query({ query: CURRENT_USER });

// console.log('res:', res);

// addApolloState(apolloClient, { props: {} });

// return addApolloState(apolloClient, { props: { ideas: res.data.ideas } });

// return { props: { user: verifyUser(appContext.ctx.req?.headers.cookie) } };

//   return { props: {} };
// };

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

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   const server = typeof window === 'undefined';

//   // console.log('getInitialProps server:', server);

//   // https://github.com/vercel/next.js/discussions/10874
//   // If on server, verify user
//   if (server) {
//     // console.log('getInitialProps cookie:', appContext.ctx.req?.headers.cookie);

//     // Req is only available on server
//     const userCookie = appContext.ctx.req?.headers.cookie;

//     // console.log('getInitialProps userCookie:', userCookie);

//     const user = verifyUser(userCookie);

//     // console.log('getInitialProps user:', user);

//     return { user, ...appProps };
//   }

//   return { ...appProps };
// };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default MyApp;
