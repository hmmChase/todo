import PropTypes from 'prop-types';

import Head from '../components/Head/Head';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import isLoggedIn from '../utils/isLoggedIn';
import redirect from '../utils/redirect';

const ResetPasswordPage = React.memo(props => (
  <>
    <Head title="Reset Password" />

    <ResetPassword
      resetToken={props.resetToken}
      resetTokenExpiry={props.resetTokenExpiry}
    />
  </>
));

ResetPasswordPage.getInitialProps = async ctx => {
  const { resetToken, resetTokenExpiry } = ctx.query;
  const loggedIn = await isLoggedIn(ctx.apolloClient);

  if (loggedIn) redirect(ctx, '/');

  return { resetToken, resetTokenExpiry };
};

ResetPasswordPage.defaultProps = {
  resetToken: '',
  resetTokenExpiry: ''
};

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string
};

export default ResetPasswordPage;
