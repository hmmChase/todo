import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Ideas from '../components/IDEA/Ideas';
import Layout from '../components/LAYOUTS/Layout';
import { CURRENT_USER_IDEAS } from '../graphql/queries/idea';
import QueryResult from '../components/OTHER/QueryResult';
import graphQLErrors from '../utils/graphQLErrors';
import isLoggedIn from '../utils/isLoggedIn';

const AccountPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const { data, loading, error } = useQuery(CURRENT_USER_IDEAS, {
    onError: error => {
      console.log('AccountPage CURRENT_USER_IDEAS error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const ideas = data?.currentUserIdeas || [];

  return (
    <>
      <h2>My Ideas</h2>

      <QueryResult error={errorMsg} loading={loading} data={data}>
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
  >
    {page}
  </Layout>
);

export const getServerSideProps = async ctx => {
  return { props: { isLoggedIn: isLoggedIn(ctx.req.headers) } };
};

export default AccountPage;
