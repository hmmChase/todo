import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Ideas from '../components/IDEA/Ideas';
import Layout from '../components/LAYOUTS/Layout';
import { CURRENT_USER_IDEAS } from '../graphql/queries/idea';
import QueryResult from '../components/REUSEABLE/QueryResult';
import graphQLErrors from '../utils/graphQLErrors';
import isLoggedIn from '../utils/isLoggedIn';

const AccountPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('AccountPage onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const { data, loading, error } = useQuery(CURRENT_USER_IDEAS, {
    onError: error => onError(error)
  });

  const ideas = data?.currentUserIdeas;

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
    hasFooter
  >
    {page}
  </Layout>
);

export const getServerSideProps = async ctx => {
  const { req, res } = ctx;

  const result = isLoggedIn(req.headers);

  if (result) return { props: { isLoggedIn: result } };

  res.writeHead(302, { Location: '/' });

  res.end();
};

export default AccountPage;
