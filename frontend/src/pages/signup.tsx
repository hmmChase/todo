import type { GetServerSideProps, NextPageWithLayout } from 'next';

import Full from '@/components/LAYOUTS/Full/Full';
import SignUp from '@/components/USER/SignUp/SignUp';
import verifyUser from '@/utils/verifyUser';

const SignUpPage: NextPageWithLayout = () => <SignUp />;

SignUpPage.getLayout = function getLayout(page) {
  return (
    <Full title='Sign up' description='SignUp page'>
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

export default SignUpPage;
