import PropTypes from 'prop-types';
import { withApollo } from '../graphql/withApollo';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = (props) => (
  <ResetPassword
    resetToken={props.resetToken}
    resetTokenExpiry={props.resetTokenExpiry}
  />
);

ResetPasswordPage.getInitialProps = async (ctx) => {
  const { resetToken, resetTokenExpiry } = ctx.query;

  return { resetToken, resetTokenExpiry };
};

ResetPasswordPage.defaultProps = { resetToken: '', resetTokenExpiry: '' };

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string,
};

export default withApollo({ ssr: true })(ResetPasswordPage);
