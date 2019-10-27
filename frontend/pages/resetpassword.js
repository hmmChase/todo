import PropTypes from 'prop-types';

import Head from '../components/Head/Head';
import LayoutMain from '../components/LayoutMain/LayoutMain';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import { withApollo } from '../graphql/withApollo';
import isLoggedIn from '../utils/isLoggedIn';
import redirect from '../utils/redirect';

const ResetPasswordPage = props => (
  <>
    <Head title="Reset Password" />

    <LayoutMain
      header={<h1>Reset Your Password</h1>}
      content={(
        <ResetPassword
          resetToken={props.resetToken}
          resetTokenExpiry={props.resetTokenExpiry}
        />
      )}
    />
  </>
);

ResetPasswordPage.getInitialProps = async ctx => {
  const { req, res, pathname, query } = ctx;

  // if (req && res && pathname) {
  //   authenticate(req, res, pathname);
  // }

  const loggedIn = await isLoggedIn(ctx.apolloClient);

  if (loggedIn) redirect(ctx, '/');

  const { resetToken, resetTokenExpiry } = query;

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

export default withApollo(React.memo(ResetPasswordPage));
