import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useQuery } from '@apollo/client';

import { ideasPerPage } from '../constants/config';
import { READ_IDEAS_PAGINATED_OFFSET } from '../graphql/queries/idea';
import isLoggedIn from '../utils/isLoggedIn';
import QueryResult from '../components/REUSEABLE/QueryResult';
import Layout from '../components/LAYOUTS/Layout';
import Ideas from '../components/IDEA/Ideas';

const OffsetPage: NextPage = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [offset, setOffset] = useState(0);

  const [page, setPage] = useState((offset + ideasPerPage) / ideasPerPage);

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
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

  const handleLoadMore = async () => {
    setIsLoadingMore(true);

    try {
      await fetchMore({
        variables: { offset: offset + ideasPerPage, limit: ideasPerPage }
      });
    } catch (error) {
      console.log('OffsetPage fetchMore error: ', error);
    }

    setIsLoadingMore(false);
  };

  const ideas = data?.ideasPaginatedOffset;

  const haveIdeas = !!ideas;

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <>
        <Ideas ideas={ideas} />

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

OffsetPage.getLayout = page => (
  <Layout
    title='Offset'
    description='Offset page'
    isLoggedIn={page.props.isLoggedIn}
    hasHeader
    hasFooter
  >
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  return { props: { isLoggedIn: isLoggedIn(ctx.req.headers) } };
};

export default OffsetPage;
