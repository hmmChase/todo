import type { GetServerSideProps, NextPageWithLayout } from 'next';

import Full from '@/components/LAYOUTS/Full/Full';
import SignIn from '@/components/USER/SignIn/SignIn';
import verifyUser from '@/utils/verifyUser';

const SignInPage: NextPageWithLayout = () => <SignIn />;

SignInPage.getLayout = function getLayout(page) {
  return (
    <Full title='Sign in' description='SignIn page'>
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

export default SignInPage;
