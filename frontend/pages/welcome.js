import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import SignIn from '../components/SignIn';
import RequestReset from '../components/RequestReset';
import SignUp from '../components/SignUp';

const WelcomePage = () => (
  <>
    <SignIn />

    <RequestReset />

    <SignUp />
  </>
);

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
          console.error('Refresh token verify error: ', error);
        }
      }
    }
  }

  return {};
};

export default withApollo({ ssr: false })(WelcomePage);
