import PropTypes from 'prop-types';
import Head from '../components/organisms/Head/Head';
import Layout from '../components/organisms/Layout/Layout';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import authenticate from '../utils/authenticate';
import withApollo from '../graphql/withApollo';

const ResetPasswordPage = props => (
  <>
    <Head title='Reset Password' />

    <Layout
      header={<h1>Reset Your Password</h1>}
      content={
        <ResetPassword
          resetToken={props.resetToken}
          resetTokenExpiry={props.resetTokenExpiry}
        />
      }
    />
  </>
);

ResetPasswordPage.getInitialProps = async ctx => {
  const { req, res, pathname, query } = ctx;

  // if (req && res && pathname) authenticate(req, res, pathname);

  const { resetToken, resetTokenExpiry } = query;

  return { resetToken, resetTokenExpiry };
};

ResetPasswordPage.defaultProps = { resetToken: '', resetTokenExpiry: '' };

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string
};

export default withApollo(ResetPasswordPage);
