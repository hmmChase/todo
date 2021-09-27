import PropTypes from 'prop-types';

import Layout from '../components/LAYOUTS/Layout';
import ResetPassError from '../components/USER/ResetPassError';
import ResetPassword from '../components/USER/ResetPassword';

const ResetPasswordPage = props => {
  const { resetPassToken, resetPassTokenExpiry } = props;

  const isTokenPresent = !!(resetPassToken && resetPassTokenExpiry);
  const isTokenExpired = Date.now() > resetPassTokenExpiry;

  return (
    <>
      {!isTokenPresent || isTokenExpired ? (
        <ResetPassError
          isTokenPresent={isTokenPresent}
          isTokenExpired={isTokenExpired}
        />
      ) : (
        <ResetPassword resetPassToken={resetPassToken} />
      )}
    </>
  );
};

ResetPasswordPage.getLayout = page => (
  <Layout
    title='Reset Password'
    description='Reset Password page'
    // isLoggedIn={page.props.isLoggedIn}
    hasHeader
    hasFooter
  >
    {page}
  </Layout>
);

export const getServerSideProps = async ctx => {
  const { token, expiry } = ctx.query;

  return { props: { resetPassToken: token, resetPassTokenExpiry: expiry } };
};

ResetPasswordPage.propTypes = {
  resetPassToken: PropTypes.string,
  resetPassTokenExpiry: PropTypes.string
};

export default ResetPasswordPage;
