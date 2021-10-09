import FullPage from '../components/LAYOUTS/FullPage';
import LogIn from '../components/USER/LogIn';

const LogInPage = () => <LogIn />;

LogInPage.getLayout = page => (
  <FullPage title='Log in' description='LogIn page'>
    {page}
  </FullPage>
);

export default LogInPage;
