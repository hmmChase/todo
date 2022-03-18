import { NextPageWithLayout } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';
import ReqPassReset from '../components/USER/ReqPassReset';

const ReqPassResetPage: NextPageWithLayout = () => <ReqPassReset />;

ReqPassResetPage.getLayout = function getLayout(page) {
  return (
    <FullPage
      title='Request Password Reset'
      description='Request Password Reset page'
    >
      {page}
    </FullPage>
  );
};

export default ReqPassResetPage;
