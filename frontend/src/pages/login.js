import FullPage from '../components/LAYOUTS/FullPage';
import LogIn from '../components/USER/LogIn';
import LogInLinks from '../components/USER/LogInLinks';

const LogInPage = () => (
  <>
    <LogIn />

    <LogInLinks />
  </>
);

LogInPage.getLayout = page => (
  <FullPage title='Log in' description='LogIn page'>
    {page}
  </FullPage>
);

export default LogInPage;
