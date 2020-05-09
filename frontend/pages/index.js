import jwt from 'jsonwebtoken';
import withApollo from '../graphql/withApollo';
import redirect from '../utils/redirect';
import { devConErr } from '../utils/devCon';
import Layout from '../components/organisms/Layout/Layout';
import Header from '../components/organisms/Header/Header';
import IdeaCardForm from '../components/molecules/IdeaCardForm/IdeaCardForm';
import Ideas from '../components/organisms/Ideas/Ideas';
import Footer from '../components/molecules/Footer/Footer';

const IndexPage = () => (
  <Layout
    title='Home'
    header={
      <Header>
        <IdeaCardForm />
      </Header>
    }
    content={<Ideas />}
    footer={<Footer />}
  />
);

// getInitialProps is called on:
// - initial page load, server-side
// - page changes, client-side
IndexPage.getInitialProps = (ctx) => {
  // err, req, res only exists on initial page load (server-side)
  // pathname, query, asPath, AppTree always available (server & client)
  const { req, res } = ctx;

  // server-side auth routing (initial page load)
  /* must be signed in */
  if (typeof window === 'undefined') {
    // If cookie header present
    if (req && req.headers && req.headers.cookie) {
      // Parse Refresh token
      const refreshToken = req.headers.cookie.replace('rt=', '');

      // If Refresh token
      if (refreshToken) {
        try {
          // Verify Refresh token
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          return {};
        } catch (error) {
          // If Refresh token invalid
          devConErr(['Refresh token verify error: ', error]);
        }
      }
    }

    // no cookie, token, or valid jwt
    redirect(res, '/welcome');
  }

  return {};
};

export default withApollo({ ssr: true })(IndexPage);
