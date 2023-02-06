import Full from '@/components/LAYOUTS/Full/Full';
import SignUpForm from '@/components/USER/SignUpForm/SignUpForm';
import type { NextPageWithLayout } from 'next';

const SignUpPage: NextPageWithLayout = () => <SignUpForm />;

SignUpPage.getLayout = function getLayout(page) {
  return (
    <Full title='Sign up' description='SignUp page'>
      {page}
    </Full>
  );
};

export default SignUpPage;
