// import Page from '../components/Page/Page';
import Head from '../components/organisms/Head/Head';
import Layout from '../components/organisms/Layout/Layout';
import Header from '../components/organisms/Header/Header';
import IdeaCardForm from '../components/molecules/IdeaCardForm/IdeaCardForm';
import Ideas from '../components/organisms/Ideas/Ideas';
import withApollo from '../graphql/withApollo';
import redirect from '../utils/redirect';
import jwt from 'jsonwebtoken';
import { togLoggedCache } from '../utils/authenticate';
import { devConErr } from '../utils/devCon';
import { refreshTokenSecret } from '../constants';

// import { useEffect } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { useRouter } from 'next/router';
// import { IS_LOGGED_IN } from '../graphql/queries';

// If no stylesheet is imported in the first route page rendered by client,
// nextjs links won't work
// https://github.com/zeit/next-plugins/issues/282
// https://github.com/zeit/next.js/issues/8626
// https://github.com/zeit/next.js/issues/5291

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
    <>
      <Head title='Home' />

      <Layout
        header={
          <Header>
            <IdeaCardForm />
          </Header>
        }
        content={<Ideas />}
      />
    </>
  );
};

// GIP is called on initial page load, server-side
// GIP is called on router change, client-side
IndexPage.getInitialProps = async ctx => {
  // err, req, res only exists on initial page load (server-side)
  // pathname, query, asPath, AppTree always available (server & client)
  const { req, res, apolloClient } = ctx;

  // On initial page load (server-side)
  if (typeof window === 'undefined') {
    // If cookie header present
    if (req && req.headers && req.headers.cookie) {
      // Parse Refresh token
      const refreshToken = req.headers.cookie.replace('rt=', '');

      // If no Refresh token
      if (!refreshToken) {
        togLoggedCache(apolloClient, false);

        redirect(res, '/welcome');
      }

      // Verify Refresh token
      try {
        jwt.verify(refreshToken, refreshTokenSecret);

        togLoggedCache(apolloClient, true);

        // If Refresh token not valid
      } catch (error) {
        devConErr(['Refresh token verify error: ', error]);

        togLoggedCache(apolloClient, false);

        redirect(res, '/welcome');
      }
      // If no cookie header
    } else {
      togLoggedCache(apolloClient, false);

      redirect(res, '/welcome');
    }
  }

  return {};
};

export default withApollo(IndexPage);
