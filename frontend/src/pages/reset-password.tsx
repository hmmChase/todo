import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';

import FullPage from '../components/LAYOUTS/FullPage';
import PassReset from '../components/USER/PassReset';
import PassResetError from '../components/USER/PassResetError';

type QueryParams = {
  token: string;
  expiry: string;
};

const PassResetPage: NextPageWithLayout = () => {
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    setIsReady(true);
  }, [router.isReady]);

  const { token, expiry } = router.query as QueryParams;

  const isTokenPresent = !!(token && expiry);

  const isTokenExpired = Date.now() > Number(expiry);

  if (isReady)
    return (
      <>
        {!isTokenPresent || isTokenExpired ? (
          <PassResetError
            isTokenExpired={isTokenExpired}
            isTokenPresent={isTokenPresent}
          />
        ) : (
          <PassReset passResetToken={token} />
        )}
      </>
    );

  return <div>loading...</div>;
};

PassResetPage.getLayout = function getLayout(page) {
  return (
    <FullPage title='Password Reset' description='Password Reset page'>
      {page}
    </FullPage>
  );
};

export default PassResetPage;
