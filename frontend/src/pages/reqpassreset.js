import Layout from '../components/LAYOUTS/Layout';
import ReqPassReset from '../components/USER/ReqPassReset';

const ReqPassResetPage = () => <ReqPassReset />;

ReqPassResetPage.getLayout = page => (
  <Layout
    title='Request Password Reset'
    description='Request Password Reset page'
    hasHeader
    hasFooter
  >
    {page}
  </Layout>
);

export default ReqPassResetPage;
