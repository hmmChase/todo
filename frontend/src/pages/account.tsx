import { GetServerSideProps, NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import verifyUser from '@/utils/verifyUser';
// import { CURRENT_USER_TASKS } from '@/graphql/queries/idea';
// import Ideas from '@/components/IDEA/Ideas/Ideas';
// import type { Ideas as Ideass } from '@/models/index';

const AccountPage: NextPageWithLayout = () => {
  // const { data, error, loading } = useQuery(CURRENT_USER_TASKS);

  // const tasks: Taskss = data?.currentUserTasks;

  return (
    <>
      <h2>Account</h2>

      {/* <QueryResult
        error={error}
        loading={loading}
        showError={true}
        showLoading={true}
      >
        <Ideas ideas={ideas} />
      </QueryResult> */}
    </>
  );
};

AccountPage.getLayout = function getLayout(page) {
  return (
    <App
      title='Account'
      description='Account page'
      hasHeader
      hasBackButton
      hasFooter
    >
      {page}
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, res } = ctx;

  const userPayload = verifyUser(req.headers.cookie);

  if (!userPayload) {
    res.writeHead(302, { Location: '/login' });

    res.end();
  }

  return { props: {} };
};

export default AccountPage;
