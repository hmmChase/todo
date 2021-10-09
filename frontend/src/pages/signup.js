import FullPage from '../components/LAYOUTS/FullPage';
import SignUp from '../components/USER/SignUp';

const SignUpPage = () => <SignUp />;

SignUpPage.getLayout = page => (
  <FullPage title='Sign up' description='SignUp page'>
    {page}
  </FullPage>
);

export default SignUpPage;
