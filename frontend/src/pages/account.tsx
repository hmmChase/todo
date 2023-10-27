import { useQuery } from '@apollo/client';
import type { GetServerSideProps, NextPageWithLayout } from 'next';

import { CURRENT_USER_TASKS } from '@/graphql/queries/task';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import Tasks from '@/components/TASK/Tasks/Tasks';
import type { Tasks as Taskss } from '@/models/index';
import verifyUser from '@/utils/verifyUser';

const AccountPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_TASKS);

  const tasks: Taskss = data?.currentUserTasks;

  return (
    <>
      <h2>Account</h2>

      <QueryResult
        error={error}
        loading={loading}
        showError={true}
        showLoading={true}
      >
        <Tasks tasks={tasks} />
      </QueryResult>
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
