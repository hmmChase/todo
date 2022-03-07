import { NextPage } from 'next';

import FullPage from '../components/LAYOUTS/FullPage';
import LogInForm from '../components/USER/LogInForm';

const LogInPage: NextPage = () => <LogInForm />;

LogInPage.getLayout = page => (
  <FullPage title='Log in' description='LogIn page'>
    {page}
  </FullPage>
);

export default LogInPage;
