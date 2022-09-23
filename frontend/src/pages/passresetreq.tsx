import { NextPageWithLayout } from 'next';

import Full from '@/components/LAYOUTS/Full/Full';
import PassResetReq from '@/components/USER/PassResetReq/PassResetReq';

const PassResetReqPage: NextPageWithLayout = () => <PassResetReq />;

PassResetReqPage.getLayout = function getLayout(page) {
  return (
    <Full
      title='Password Reset Request'
      description='Password Reset Request page'
    >
      {page}
    </Full>
  );
};

export default PassResetReqPage;
