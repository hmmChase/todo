import Layout from '../components/LAYOUTS/Layout';
import LogIn from '../components/USER/LogIn';

const LogInPage = () => <LogIn />;

LogInPage.getLayout = page => (
  <Layout title='Log in' description='LogIn page' hasHeader>
    {page}
  </Layout>
);

export default LogInPage;
