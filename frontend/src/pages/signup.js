import FullPage from '../components/LAYOUTS/FullPage';
import SignUp from '../components/USER/SignUp';
import SignUpLinks from '../components/USER/SignUpLinks';

const SignUpPage = () => (
  <>
    <SignUp />

    <SignUpLinks />
  </>
);

SignUpPage.getLayout = page => (
  <FullPage title='Sign up' description='SignUp page'>
    {page}
  </FullPage>
);

export default SignUpPage;
