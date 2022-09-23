import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';

import Full from '@/components/LAYOUTS/Full/Full';
import PassReset from '@/components/USER/PassReset/PassReset';
import PassResetError from '@/components/USER/PassResetError/PassResetError';

type QueryParams = { token: string; expiry: string };

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
    <Full title='Password Reset' description='Password Reset page'>
      {page}
    </Full>
  );
};

export default PassResetPage;
