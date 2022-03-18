import { NextPageWithLayout } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';
import SignUpForm from '../components/USER/SignUpForm';

const SignUpPage: NextPageWithLayout = () => <SignUpForm />;

SignUpPage.getLayout = function getLayout(page) {
  return (
    <FullPage title='Sign up' description='SignUp page'>
      {page}
    </FullPage>
  );
};

export default SignUpPage;
