import Full from '@/components/LAYOUTS/Full/Full';
import LogInForm from '@/components/USER/LogInForm/LogInForm';
import type { NextPageWithLayout } from 'next';

const LogInPage: NextPageWithLayout = () => <LogInForm />;

LogInPage.getLayout = function getLayout(page) {
  return (
    <Full title='Log in' description='LogIn page'>
      {page}
    </Full>
  );
};

export default LogInPage;
