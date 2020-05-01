import jwt from 'jsonwebtoken';
import withApollo from '../graphql/withApollo';
import redirect from '../utils/redirect';
import { devConErr } from '../utils/devCon';
import Layout from '../components/organisms/Layout/Layout';
import SignOn from '../components/organisms/SignOn/SignOn';

const WelcomePage = () => <Layout title='Welcome' content={<SignOn />} />;

WelcomePage.getInitialProps = async (ctx) => {
  const { req, res } = ctx;

  /* must not be signed in */
  if (typeof window === 'undefined') {
    if (req && req.headers && req.headers.cookie) {
      const refreshToken = req.headers.cookie.replace('rt=', '');

      if (refreshToken) {
        try {
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          redirect(res, '/');
        } catch (error) {
          devConErr('Refresh token verify error: ', error);
        }
      }
    }
  }

  return {};
};

export default withApollo({ ssr: false })(WelcomePage);
