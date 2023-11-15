import type { GetServerSideProps, NextPageWithLayout } from 'next';

import Full from '@/components/LAYOUTS/Full/Full';
import LogInForm from '@/components/USER/LogInForm/LogInForm';
import verifyUser from '@/utils/verifyUser';

const LogInPage: NextPageWithLayout = () => <LogInForm />;

LogInPage.getLayout = function getLayout(page) {
  return (
    <Full title='Log in' description='LogIn page'>
      {page}
    </Full>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, res } = ctx;

  const userPayload = verifyUser(req.headers.cookie);

  if (userPayload) {
    res.writeHead(302, { Location: '/' });

    res.end();
  }

  return { props: {} };
};

export default LogInPage;
