import PropTypes from 'prop-types';

import Head from '../components/Head/Head';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import isLoggedIn from '../utils/isLoggedIn';
import redirect from '../utils/redirect';

const ResetPasswordPage = React.memo(props => (
  <>
    <Head title="Reset Password" />

    <ResetPassword resetToken={props.resetToken} />
  </>
));

ResetPasswordPage.getInitialProps = async ctx => {
  const loggedIn = await isLoggedIn(ctx.apolloClient);

  if (loggedIn) redirect(ctx, '/');

  const { resetToken, resetTokenExpiry } = ctx.query;
  const isTokenPresent = resetToken && resetTokenExpiry;
  const isTokenExpired = Date.now() > resetTokenExpiry;

  if (!isTokenPresent || isTokenExpired) redirect(ctx, '/requestreset');

  return { resetToken };
};

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string.isRequired
};

export default ResetPasswordPage;
