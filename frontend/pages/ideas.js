import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import { refreshTokenSecret } from '../constants';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Ideas from '../components/Ideas';
import Footer from '../components/Footer';

const IdeasPage = () => (
  <Layout
    title='Ideas'
    header={<Header />}
    content={<Ideas />}
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
          jwt.verify(refreshToken, refreshTokenSecret);

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
