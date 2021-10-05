import Layout from '../components/LAYOUTS/Layout';
import SignUp from '../components/USER/SignUp';

const SignUpPage = () => <SignUp />;

SignUpPage.getLayout = page => (
  <Layout title='Sign up' description='SignUp page'>
    {page}
  </Layout>
);

export default SignUpPage;
