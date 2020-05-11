import PropTypes from 'prop-types';
import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import ResetPassError from '../components/ResetPassError';
import ResetPassword from '../components/organisms/ResetPassword/ResetPassword';

// import Layout from '../components/organisms/Layout/Layout';
// import Footer from '../components/molecules/Footer/Footer';

const ResetPasswordPage = (props) => {
  const isTokenPresent = !!(props.resetToken && props.resetTokenExpiry);
  const isTokenExpired = Date.now() > props.resetTokenExpiry;

  if (!isTokenPresent || isTokenExpired)
    return (
      <ResetPassError
        isTokenPresent={isTokenPresent}
        isTokenExpired={isTokenExpired}
      />
    );

  return <ResetPassword resetToken={props.resetToken} />;
};

// const ResetPasswordPage = (props) => (
//   <Layout
//     title='Reset Password'
//     header={<h1>Reset Your Password</h1>}
//     content={
//       <ResetPassword
//         resetToken={props.resetToken}
//         resetTokenExpiry={props.resetTokenExpiry}
//       />
//     }
//     footer={<Footer />}
//   />
// );

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
