import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import { refreshTokenSecret } from '../constants';
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

  if (req && req.headers && req.headers.cookie) {
    const refreshToken = req.headers.cookie.replace('rt=', '');

    if (refreshToken) {
      try {
        jwt.verify(refreshToken, refreshTokenSecret);

        return redirect(res, '/');
      } catch (error) {
        console.error('Refresh token verify error: ', error);

        return redirect(res, '/welcome');
      }
    } else return redirect(res, '/welcome');
  } else return redirect(res, '/welcome');

  return {};
};

export default withApollo({ ssr: false })(WelcomePage);
