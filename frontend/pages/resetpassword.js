import PropTypes from 'prop-types';
import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
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
  if (signedIn(req)) redirect(res, '/');
  else return { resetToken, resetTokenExpiry };
};

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string.isRequired,
  resetTokenExpiry: PropTypes.string.isRequired,
};

export default withApollo({ ssr: true })(ResetPasswordPage);
