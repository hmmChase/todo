import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ideasPerPage } from '../config';
import { READ_IDEAS_PAGINATED_CURSER } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';
import isLoggedIn from '../utils/isLoggedIn';
import QueryResult from '../components/REUSEABLE/QueryResult';
import Layout from '../components/LAYOUTS/Layout';
import Ideas from '../components/IDEA/Ideas';

const CurserPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    READ_IDEAS_PAGINATED_CURSER,
    {
      variables: { take: ideasPerPage, skip: null },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true,

      onError: error => {
        console.log('CurserPage READ_IDEAS_PAGINATED_CURSER error: ', error);

        setErrorMsg(graphQLErrors(error));
      }
    }
  );

  const handleLoadMore = async () => {
    setIsLoadingMore(true);

    try {
      await fetchMore({
        variables: { take: ideasPerPage, skip: offset + ideasPerPage }
      });
    } catch (error) {
      console.log('CurserPage fetchMore error: ', error);

      setErrorMsg(graphQLErrors(error));
    }

    setIsLoadingMore(false);
  };

  const ideas = data?.ideasPaginatedCurser || [];

  const haveIdeas = !!ideas.length;

  return (
    <>
      <QueryResult error={errorMsg} loading={loading} data={data}>
        <Ideas ideas={ideas} />
      </QueryResult>

      {haveIdeas &&
        (isLoadingMore ? (
          <p>loading...</p>
        ) : (
          <button onClick={handleLoadMore}>More</button>
        ))}
    </>
  );
};

CurserPage.getLayout = page => (
  <Layout
    title='Curser'
    description='Curser page'
    isLoggedIn={page.props.isLoggedIn}
    hasHeader
    hasFooter
  >
    {page}
  </Layout>
);

export const getServerSideProps = async ctx => {
  return { props: { isLoggedIn: isLoggedIn(ctx.req.headers) } };
};

export default CurserPage;
