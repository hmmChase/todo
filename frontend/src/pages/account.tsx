import { NextPage, GetServerSideProps } from 'next';
import { useQuery } from '@apollo/client';

import Ideas from '../components/IDEA/Ideas';
import Layout from '../components/LAYOUTS/Layout';
import { CURRENT_USER_IDEAS } from '../graphql/queries/idea';
import QueryResult from '../components/REUSEABLE/QueryResult';
import isLoggedIn from '../utils/isLoggedIn';

const AccountPage: NextPage = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_IDEAS);

  const ideas = data?.currentUserIdeas;

  return (
    <>
      <h2>My Ideas</h2>

      <QueryResult loading={loading} error={error} data={data}>
        <Ideas ideas={ideas} />
      </QueryResult>
    </>
  );
};

AccountPage.getLayout = page => (
  <Layout
    title='Account'
    description='Account page'
    isLoggedIn={page.props.isLoggedIn}
    hasHeader
    hasBackButton
    hasFooter
  >
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, res } = ctx;

  const result = isLoggedIn(req.headers);

  if (result) return { props: { isLoggedIn: result } };

  res.writeHead(302, { Location: '/' });

  res.end();

  return { props: {} };
};

export default AccountPage;
