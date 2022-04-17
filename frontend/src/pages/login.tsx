import { NextPageWithLayout } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';
import LogInForm from '../components/USER/LogInForm';

const LogInPage: NextPageWithLayout = () => <LogInForm />;

LogInPage.getLayout = function getLayout(page) {
  return (
    <FullPage title='Log in' description='LogIn page'>
      {page}
    </FullPage>
  );
};

export default LogInPage;
