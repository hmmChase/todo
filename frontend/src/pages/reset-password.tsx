import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';

import FullPage from '../components/LAYOUTS/FullPage';
import ResetPassError from '../components/USER/ResetPassError';
import ResetPassword from '../components/USER/ResetPassword';

const ResetPasswordPage: NextPageWithLayout = () => {
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    setIsReady(true);
  }, [router.isReady]);

  const { token, expiry } = router.query;

  const isTokenPresent = !!(token && expiry);

  const isTokenExpired = Date.now() > Number(expiry);

  if (isReady)
    return (
      <>
        {!isTokenPresent || isTokenExpired ? (
          <ResetPassError
            isTokenExpired={isTokenExpired}
            isTokenPresent={isTokenPresent}
          />
        ) : (
          <ResetPassword resetPassToken={token} />
        )}
      </>
    );

  return <div>loading...</div>;
};

ResetPasswordPage.getLayout = function getLayout(page) {
  return (
    <FullPage title='Reset Password' description='Reset Password page'>
      {page}
    </FullPage>
  );
};

export default ResetPasswordPage;
