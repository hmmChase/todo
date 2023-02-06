import { CURRENT_USER_IDEAS } from '@/graphql/queries/idea';
import { useQuery } from '@apollo/client';
import App from '@/components/LAYOUTS/App/App';
import Ideas from '@/components/IDEA/Ideas/Ideas';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import type { Ideas as Ideass } from '@/models/index';
import type { NextPageWithLayout } from 'next';
// import { GetServerSideProps, NextPageWithLayout } from 'next';
// import verifyUser from '@/utils/verifyUser';

const AccountPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_IDEAS);

  const ideas: Ideass = data?.currentUserIdeas;

  return (
    <>
      <h2>My Ideas</h2>

      <QueryResult
        error={error}
        loading={loading}
        showError={true}
        showLoading={true}
      >
        <Ideas ideas={ideas} />
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

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const { req, res } = ctx;

//   const userPayload = verifyUser(req.headers.cookie);

//   if (!userPayload) {
//     res.writeHead(302, { Location: '/' });

//     res.end();
//   }

//   return { props: {} };
// };

export default AccountPage;
