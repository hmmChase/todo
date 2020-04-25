import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import { refreshTokenSecret } from '../constants';
import Header from '../components/Header';
import Page from '../components/Page';
import { IS_LOGGED_IN } from '../graphql/queries';

// import { useEffect } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { useRouter } from 'next/router';

const IndexPage = () => {
  // const router = useRouter();
  // const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // console.log('TCL: data', data);

  // useEffect(() => {
  //   !loading && !error && data && data.isLoggedIn
  //     ? router.push('/')
  //     : router.push('/welcome');
  // }, [data, error, loading, router]);

  return (
    <Page>
      <Header />

      <h1>Hello</h1>
    </Page>
  );
};

// getInitialProps is called on:
// - initial page load, server-side
// - page changes, client-side
IndexPage.getInitialProps = (ctx) => {
  // err, req, res only exists on initial page load (server-side)
  // pathname, query, asPath, AppTree always available (server & client)
  const { req, res, apolloClient } = ctx;

  // server-side auth routing (initial page load)
  if (typeof window === 'undefined') {
    // If cookie header present
    if (req && req.headers && req.headers.cookie) {
      // Parse Refresh token
      const refreshToken = req.headers.cookie.replace('rt=', '');

      // If Refresh token
      if (refreshToken) {
        try {
          // Verify Refresh token
          jwt.verify(refreshToken, refreshTokenSecret);

          return {};
        } catch (error) {
          // If Refresh token invalid
          console.error('Refresh token verify error: ', error);

          redirect(res, '/welcome');
        }
        // no Refresh token
      } else redirect(res, '/welcome');
      // no cookie header
    } else redirect(res, '/welcome');
    // client-side
  } else {
    const { loading, error, data } = apolloClient.query({
      query: IS_LOGGED_IN,
    });

    console.log('1111111111111111111111111: ', data);
  }

  return {};
};

// I could do an Auth HOC
// Could handle everything on the client

export default withApollo({ ssr: true })(IndexPage);
