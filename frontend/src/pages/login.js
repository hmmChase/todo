import Layout from '../components/LAYOUTS/Layout';
import LogIn from '../components/USER/LogIn';
import ForgotPassword from '../components/USER/ForgotPassword';

const LogInPage = () => (
  <>
    <LogIn />

    <ForgotPassword />
  </>
);

LogInPage.getLayout = page => (
  <Layout title='Log in' description='LogIn page' hasHeader hasFooter>
    {page}
  </Layout>
);

export default LogInPage;
