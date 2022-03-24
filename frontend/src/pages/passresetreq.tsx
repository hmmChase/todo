import { NextPageWithLayout } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';
import PassResetReq from '../components/USER/PassResetReq';

const PassResetReqPage: NextPageWithLayout = () => <PassResetReq />;

PassResetReqPage.getLayout = function getLayout(page) {
  return (
    <FullPage
      title='Password Reset Request'
      description='Password Reset Request page'
    >
      {page}
    </FullPage>
  );
};

export default PassResetReqPage;
