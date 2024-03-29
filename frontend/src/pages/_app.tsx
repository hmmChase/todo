import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import type { AppPropsWithLayout } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import { siteTitle } from '@/constants/config';
import { useApollo } from '@/graphql/apolloClient';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
// import { addApolloState, initializeApollo } from '@/graphql/apolloClient';
// import { CURRENT_USER } from '@/graphql/queries/user';
// import { READ_TASKS } from '@/graphql/queries/task';
// import type { User } from '@/models/index';
// import UserProvider from '@/context/User';
// import verifyUser from '@/utils/verifyUser';

// https://github.com/vercel/next.js/tree/master/examples/with-styled-components
// https://nextjs.org/docs/advanced-features/custom-app

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // const [user, setUser] = useState<User | null>(null);

  const apolloClient = useApollo(pageProps);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await apolloClient.query({
  //       query: CURRENT_USER,
  //       errorPolicy: 'all'
  //       // fetchPolicy: 'cache-first'
  //     });

  //     setUser(res.data.currentUser);
  //   };

  //   fetchUser();
  // });

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

      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

// App.getInitialProps = async (appContext: AppContext) => {
// const apolloClient = initializeApollo();

// const res = await apolloClient.query({ query: CURRENT_USER });

// console.log('res:', res);

// addApolloState(apolloClient, { props: {} });

// return addApolloState(apolloClient, { props: { tasks: res.data.tasks } });

// return { props: { user: verifyUser(appContext.ctx.req?.headers.cookie) } };

//   return { props: {} };
// };

//? if on server, verify user
// if (typeof window === 'undefined') {
//   App.getInitialProps = async (appContext: AppContext) => {
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

// App.getInitialProps = async (appContext: AppContext) => {
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

export default App;
