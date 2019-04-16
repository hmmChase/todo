/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const ResetPage = React.memo(props => (
  <>
    <Head>
      <title>next-graphql-starter | Reset Password</title>
    </Head>

    <ResetPassword
      resetToken={props.router.query.resetToken}
      resetTokenExpiry={props.router.query.resetTokenExpiry}
    />
  </>
));

ResetPage.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(ResetPage);
