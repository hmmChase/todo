import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ideasPerPage } from '../config';
import { READ_IDEAS_PAGINATED_OFFSET } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/Layout';
import IdeaList from '../components/IdeaList';
import QueryResult from '../components/QueryResult';

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
      const fetched = await fetchMore({
        variables: { offset: offset + ideasPerPage, limit: ideasPerPage }
      });

      console.log('fetched:', fetched);
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
      <h1>Offset Page</h1>

      <QueryResult error={errorMsg} loading={loading} data={data}>
        <IdeaList ideas={ideas} />
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
          <button onClick={handleLoadMore}>Load More</button>
        ))}
    </>
  );
};

OffsetPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Offset' description='Offset page' header>
      {page}
    </Layout>
  );
};

export default OffsetPage;
