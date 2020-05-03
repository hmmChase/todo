// import order: react=>next=>libs=>utils=>config=>queries=>components=>css
import jwt from 'jsonwebtoken';
import withApollo from '../graphql/withApollo';
import redirect from '../utils/redirect';
import Layout from '../components/Layout';
import Header from '../components/Header';
import IdeaCardForm from '../components/IdeaCardForm';
import Ideas from '../components/Ideas';
import Footer from '../components/Footer';

const IndexPage = () => (
  <Layout
    title='Home'
    header={
      <>
        <Header />
        <IdeaCardForm />
      </>
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
          console.error('Refresh token verify error: ', error);
        }
      }
    }

    // no cookie, token, or valid jwt
    redirect(res, '/welcome');
  }

  return {};
};

export default withApollo({ ssr: true })(IndexPage);
