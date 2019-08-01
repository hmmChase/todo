import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

// import { Head, DisplayError, RequestReset, ResetPassword } from '../components';
import Head from '../components/Head/Head';
import DisplayError from '../components/DisplayError/DisplayError';
import RequestReset from '../components/RequestReset/RequestReset';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import isLoggedIn from '../utils/isLoggedIn';
import redirect from '../utils/redirect';

const ResetPasswordPage = React.memo(props => {
  const { resetToken, resetTokenExpiry } = props.router.query;

  const isTokenPresent = resetToken && resetTokenExpiry;
  const isTokenExpired = Date.now() > resetTokenExpiry;
  const isTokenValid = isTokenPresent && !isTokenExpired;

  const tokenMissingError = {
    message: 'Your reset token is invalid.  Please request a new one.'
  };
  const tokenExpiredError = {
    message: 'Your reset token is expired.  Please request a new one.'
  };

  if (isTokenValid) {
    return (
      <>
        <Head title="Reset Password" />

        <RequestReset />
      </>
    );
  }

  return (
    <>
      <Head title="Reset Password" />

      <DisplayError
        error={
          (!isTokenPresent && tokenMissingError)
          || (isTokenExpired && tokenExpiredError)
        }
      />

      <ResetPassword resetToken={resetToken} />
    </>
  );
});

ResetPasswordPage.getInitialProps = async ctx => {
  const loggedIn = await isLoggedIn(ctx.apolloClient);

  if (loggedIn) redirect(ctx, '/');

  return {};
};

ResetPasswordPage.defaultProps = {
  router: { query: { resetToken: '', resetTokenExpiry: '' } }
};

ResetPasswordPage.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      resetToken: PropTypes.string,
      resetTokenExpiry: PropTypes.string
    })
  })
};

export default withRouter(ResetPasswordPage);
