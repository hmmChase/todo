// import Page from '../components/Page/Page';
import Head from '../components/Head/Head';
import SignOn from '../components/SignOn/SignOn';
import withApollo from '../graphql/withApollo';
import jwt from 'jsonwebtoken';
import redirect from '../utils/redirect';
import { togLoggedCache } from '../utils/authenticate';
import { devConErr } from '../utils/devCon';
import { refreshTokenSecret } from '../constants';

const WelcomePage = () => (
  <>
    <Head title='Welcome' />

    <SignOn />
  </>
);

WelcomePage.getInitialProps = async ctx => {
  const { req, res, apolloClient } = ctx;

  // On initial page load (server-side)
  // If cookie header present
  if (req && req.headers && req.headers.cookie) {
    // Parse Refresh token
    const refreshToken = req.headers.cookie.replace('rt=', '');

    // If no Refresh token
    if (!refreshToken) togLoggedCache(apolloClient, false);

    // Verify Refresh token
    try {
      jwt.verify(refreshToken, refreshTokenSecret);

      togLoggedCache(apolloClient, true);

      redirect(res, '/');

      // If Refresh token not valid
    } catch (error) {
      devConErr('Refresh token verify error: ', error);

      togLoggedCache(apolloClient, false);
    }
    // If no cookie header
  } else {
    togLoggedCache(apolloClient, false);
  }

  return {};
};

export default withApollo(WelcomePage, { ssr: false });
