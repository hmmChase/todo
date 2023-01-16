// import { GetServerSideProps, NextPageWithLayout } from 'next';
import { NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import { Users } from '@/models/index';
import { READ_USERS } from '@/graphql/queries/user';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import UserList from '@/components/USER/UserList/UserList';
// import verifyUser from '@/utils/verifyUser';

const AdminPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(READ_USERS);

  const users: Users = data?.users;

  return (
    <>
      <h2>Admin</h2>

      <QueryResult data={users} error={error} loading={loading}>
        <UserList users={users} />
      </QueryResult>
    </>
  );
};

AdminPage.getLayout = function getLayout(page) {
  return (
    <App
      title='Admin'
      description='Admin page'
      hasHeader
      hasBackButton
      hasFooter
    >
      {page}
    </App>
  );
};

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const { req, res } = ctx;

//   const userPayload = verifyUser(req.headers.cookie);

//   if (!userPayload) {
//     res.writeHead(302, { Location: '/' });

//     res.end();
//   }

//   return { props: {} };
// };

export default AdminPage;
