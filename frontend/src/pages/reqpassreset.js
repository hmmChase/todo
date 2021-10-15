import FullPage from '../components/LAYOUTS/FullPage';
import ReqPassReset from '../components/USER/ReqPassReset';

const ReqPassResetPage = () => <ReqPassReset />;

ReqPassResetPage.getLayout = page => (
  <FullPage
    title='Request Password Reset'
    description='Request Password Reset page'
  >
    {page}
  </FullPage>
);

export default ReqPassResetPage;
