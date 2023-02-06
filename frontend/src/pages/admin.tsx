import { READ_USERS } from '@/graphql/queries/user';
import { useQuery } from '@apollo/client';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import type { NextPageWithLayout } from 'next';
import type { Users as Userss } from '@/models/index';
import Users from '@/components/USER/Users/Users';
// import { GetServerSideProps, NextPageWithLayout } from 'next';
// import verifyUser from '@/utils/verifyUser';

const AdminPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(READ_USERS);

  const users: Userss = data?.users;

  return (
    <>
      <h2>Admin</h2>

      <QueryResult
        error={error}
        loading={loading}
        showError={true}
        showLoading={true}
      >
        <Users users={users} />
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
