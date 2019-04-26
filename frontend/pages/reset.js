/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import DisplayError from '../components/DisplayError/DisplayError';

const ResetPage = React.memo(props => {
  const { resetToken, resetTokenExpiry } = props.router.query;

  const isTokenMissing = !resetToken || !resetTokenExpiry;
  const isTokenExpired = Date.now() > resetTokenExpiry;
  const isTokenValid = !isTokenMissing && !isTokenExpired;

  const tokenMissingError = {
    message: 'Your reset token is invalid.  Please request a new one.'
  };
  const tokenExpiredError = {
    message: 'Your reset token is expired.  Please request a new one.'
  };

  return (
    <>
      <Head>
        <title>next-graphql-starter | Reset Password</title>
      </Head>

      {isTokenMissing && <DisplayError error={tokenMissingError} />}
      {isTokenExpired && <DisplayError error={tokenExpiredError} />}

      {isTokenValid && <ResetPassword resetToken={resetToken} />}
    </>
  );
});

ResetPage.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(ResetPage);
