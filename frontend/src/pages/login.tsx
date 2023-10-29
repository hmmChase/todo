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

// export const getServerSideProps = () => {
//   const user = req.session.user;

//   if (user === undefined) {
//     res.setHeader('location', '/login');
//     res.statusCode = 302;
//     res.end();

//     return {
//       props: { user: { isLoggedIn: false, login: '', avatarUrl: '' } as User }
//     };
//   }

//   return { props: { user: req.session.user } };
// };
