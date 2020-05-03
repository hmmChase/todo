import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import Layout from '../components/Layout';
import Header from '../components/Header';
import AllIdeas from '../components/AllIdeas';
import Footer from '../components/Footer';

const IdeasPage = () => (
  <Layout
    title='Ideas'
    header={<Header />}
    content={<AllIdeas />}
    footer={<Footer />}
  />
);

IdeasPage.getInitialProps = (ctx) => {
  const { req, res } = ctx;

  /* must be signed in */
  if (typeof window === 'undefined') {
    if (req && req.headers && req.headers.cookie) {
      const refreshToken = req.headers.cookie.replace('rt=', '');

      if (refreshToken) {
        try {
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          return {};
        } catch (error) {
          console.error('Refresh token verify error: ', error);
        }
      }
    }

    redirect(res, '/welcome');
  }

  return {};
};

export default withApollo({ ssr: true })(IdeasPage);
