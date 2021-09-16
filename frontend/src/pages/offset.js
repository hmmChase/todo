import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ideasPerPage } from '../config';
import { READ_IDEAS_PAGINATED_OFFSET } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';
import isLoggedIn from '../utils/isLoggedIn';
import QueryResult from '../components/OTHER/QueryResult';
import Layout from '../components/LAYOUTS/Layout';
import Ideas from '../components/IDEA/Ideas';

const OffsetPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [offset, setOffset] = useState(0);

  const [page, setPage] = useState((offset + ideasPerPage) / ideasPerPage);

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    READ_IDEAS_PAGINATED_OFFSET,
    {
      variables: { offset, limit: ideasPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true,

      onError: error => {
        console.log('OffsetPage READ_IDEAS_PAGINATED_OFFSET error: ', error);

        setErrorMsg(graphQLErrors(error));
      }
    }
  );

  const handleChangePageBackwards = () => {
    const previousOffset = offset - ideasPerPage;

    setOffset(previousOffset);

    const previousPage = offset / ideasPerPage;

    setPage(previousPage);
  };

  const handleChangePageForwards = () => {
    const nextOffset = offset + ideasPerPage;

    setOffset(nextOffset);

    const nextPage = (nextOffset + ideasPerPage) / ideasPerPage;

    setPage(nextPage);
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);

    try {
      await fetchMore({
        variables: { offset: offset + ideasPerPage, limit: ideasPerPage }
      });
    } catch (error) {
      console.log('OffsetPage fetchMore error: ', error);

      setErrorMsg(graphQLErrors(error));
    }

    setIsLoadingMore(false);
  };

  const ideas = data?.ideasPaginatedOffset || [];

  const haveIdeas = !!ideas.length;

  return (
    <>
      <QueryResult error={errorMsg} loading={loading} data={data}>
        <Ideas ideas={ideas} />
      </QueryResult>

      {haveIdeas && (
        <div>
          <button onClick={handleChangePageBackwards}>{'<'}</button>

          <span> {page} </span>

          <button onClick={handleChangePageForwards}>{'>'}</button>
        </div>
      )}

      {haveIdeas &&
        (isLoadingMore ? (
          <p>loading...</p>
        ) : (
          <button onClick={handleLoadMore}>More</button>
        ))}
    </>
  );
};

OffsetPage.getLayout = page => (
  <Layout
    title='Offset'
    description='Offset page'
    isLoggedIn={page.props.isLoggedIn}
    hasHeader
  >
    {page}
  </Layout>
);

export const getServerSideProps = async ctx => {
  return { props: { isLoggedIn: isLoggedIn(ctx.req.headers) } };
};

export default OffsetPage;
