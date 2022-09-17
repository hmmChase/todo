// import { GetServerSideProps, NextPageWithLayout } from 'next';
import { NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import { CURRENT_USER_IDEAS } from '@/graphql/queries/idea';
import { Ideas } from '@/models/index';
import IdeaList from '@/components/IDEA/IdeaList/IdeaList';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/REUSEABLE/QueryResult/QueryResult';
// import verifyUser from '@/utils/verifyUser';

const AccountPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_IDEAS);

  const ideas: Ideas = data?.currentUserIdeas;

  return (
    <>
      <h2>My Ideas</h2>

      <QueryResult data={ideas} error={error} loading={loading}>
        <IdeaList ideas={ideas} />
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
