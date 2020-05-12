import PropTypes from 'prop-types';
import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import Layout from '../components/organisms/Layout/Layout';
import ResetPassError from '../components/ResetPassError';
import ResetPassword from '../components/organisms/ResetPassword/ResetPassword';

const ResetPasswordPage = (props) => {
  const isTokenPresent = !!(props.resetToken && props.resetTokenExpiry);
  const isTokenExpired = Date.now() > props.resetTokenExpiry;

  if (!isTokenPresent || isTokenExpired)
    return (
      <Layout
        title='Reset Password'
        header={<h1>Reset Your Password</h1>}
        content={
          <ResetPassError
            isTokenPresent={isTokenPresent}
            isTokenExpired={isTokenExpired}
          />
        }
      />
    );

  return (
    <Layout
      title='Reset Password'
      header={<h1>Reset Your Password</h1>}
      content={<ResetPassword resetToken={props.resetToken} />}
    />
  );
};

ResetPasswordPage.getInitialProps = async (ctx) => {
  const { req, res, query } = ctx;
  const { resetToken, resetTokenExpiry } = query;

  /* must not be signed in */
  if (req && signedIn(req)) redirect(res, '/');

  return { resetToken, resetTokenExpiry };
};

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string,
};

export default withApollo({ ssr: true })(ResetPasswordPage);
