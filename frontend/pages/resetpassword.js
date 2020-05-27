import PropTypes from 'prop-types';
import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import Layout from '../components/organisms/Layout/Layout';
import ResetPassError from '../components/organisms/ResetPassError/ResetPassError';
import Header from '../components/organisms/Header/Header';
import ResetPassword from '../components/organisms/ResetPassword/ResetPassword';

const ResetPasswordPage = (props) => {
  const isTokenPresent = !!(props.resetToken && props.resetTokenExpiry);
  const isTokenExpired = Date.now() > props.resetTokenExpiry;

  return (
    <Layout
      title='Reset Password'
      header={<Header title='Reset Your Password' />}
      content={
        !isTokenPresent || isTokenExpired ? (
          <ResetPassError
            isTokenPresent={isTokenPresent}
            isTokenExpired={isTokenExpired}
          />
        ) : (
          <ResetPassword resetToken={props.resetToken} />
        )
      }
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
