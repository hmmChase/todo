import { useState } from 'react';
import { NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import { Ideas } from '../models';
import { ideasPerPage } from '../constants/config';
import { READ_IDEAS_PAGINATED_OFFSET } from '../graphql/queries/idea';
import IdeaList from '../components/IDEA/IdeaList';
import Layout from '../components/LAYOUTS/Layout';
import QueryResult from '../components/REUSEABLE/QueryResult';

const OffsetPage: NextPageWithLayout = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [offset, setOffset] = useState(0);

  const [page, setPage] = useState((offset + ideasPerPage) / ideasPerPage);

  const { data, error, loading, fetchMore } = useQuery(
    READ_IDEAS_PAGINATED_OFFSET,
    {
      variables: { offset, limit: ideasPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
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

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    fetchMore({
      variables: { offset: offset + ideasPerPage, limit: ideasPerPage }
    });

    setIsLoadingMore(false);
  };

  const ideas: Ideas = data?.ideasPaginatedOffset;

  const haveIdeas = !!ideas;

  return (
    <QueryResult data={ideas} error={error} loading={loading}>
      <>
        <IdeaList ideas={ideas} />

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
    </QueryResult>
  );
};

OffsetPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Offset' description='Offset page' hasHeader hasFooter>
      {page}
    </Layout>
  );
};

export default OffsetPage;
