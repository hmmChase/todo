import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import { refreshTokenSecret } from '../constants';
import Header from '../components/Header';
import Ideas from '../components/Ideas';

const IdeasPage = () => (
  <>
    <Header />

    <Ideas />
  </>
);

IdeasPage.getInitialProps = (ctx) => {
  const { req, res } = ctx;

  if (typeof window === 'undefined') {
    if (req && req.headers && req.headers.cookie) {
      const refreshToken = req.headers.cookie.replace('rt=', '');

      if (!refreshToken) redirect(res, '/welcome');

      try {
        jwt.verify(refreshToken, refreshTokenSecret);
      } catch (error) {
        console.error('Refresh token verify error: ', error);

        redirect(res, '/welcome');
      }
    } else redirect(res, '/welcome');
  }

  return {};
};

export default withApollo({ ssr: false })(IdeasPage);
