import { NextPage } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';
import SignUpForm from '../components/USER/SignUpForm';

const SignUpPage: NextPage = () => <SignUpForm />;

SignUpPage.getLayout = page => (
  <FullPage title='Sign up' description='SignUp page'>
    {page}
  </FullPage>
);

export default SignUpPage;
