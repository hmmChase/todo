import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { withApollo } from '../graphql/withApollo';
import redirect from '../utils/redirect';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = (props) => (
  <ResetPassword
    resetToken={props.resetToken}
    resetTokenExpiry={props.resetTokenExpiry}
  />
);

ResetPasswordPage.getInitialProps = async (ctx) => {
  const { req, res, query } = ctx;
  const { resetToken, resetTokenExpiry } = query;

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

  return { resetToken, resetTokenExpiry };
};

ResetPasswordPage.defaultProps = { resetToken: '', resetTokenExpiry: '' };

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string,
};

export default withApollo({ ssr: true })(ResetPasswordPage);
