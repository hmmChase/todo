import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import FullPage from '../components/LAYOUTS/FullPage';
import ResetPassError from '../components/USER/ResetPassError';
import ResetPassword from '../components/USER/ResetPassword';

const ResetPasswordPage = () => {
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    setIsReady(true);
  }, [router.isReady]);

  const { token, expiry } = router.query;

  const isTokenPresent = !!(token && expiry);
  const isTokenExpired = Date.now() > expiry;

  if (isReady)
    return (
      <>
        {!isTokenPresent || isTokenExpired ? (
          <ResetPassError
            isTokenPresent={isTokenPresent}
            isTokenExpired={isTokenExpired}
          />
        ) : (
          <ResetPassword resetPassToken={token} />
        )}
      </>
    );

  return <div>loading...</div>;
};

ResetPasswordPage.getLayout = page => (
  <FullPage
    title='Reset Password'
    description='Reset Password page'
    // isLoggedIn={page.props.isLoggedIn}
  >
    {page}
  </FullPage>
);

export default ResetPasswordPage;
