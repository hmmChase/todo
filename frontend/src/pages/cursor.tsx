// import { useState } from 'react';
import { NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import { Ideas } from '../models';
import { ideasPerPage } from '../constants/config';
import { READ_IDEAS_PAGINATED_CURSOR } from '../graphql/queries/idea';
import IdeaList from '../components/IDEA/IdeaList';
import Layout from '../components/LAYOUTS/Layout';
import QueryResult from '../components/REUSEABLE/QueryResult';

const CursorPage: NextPageWithLayout = () => {
  // const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, error, loading, fetchMore } = useQuery(
    READ_IDEAS_PAGINATED_CURSOR,
    {
      variables: { take: ideasPerPage, skip: null },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
    }
  );

  // const handleLoadMore = () => {
  //   setIsLoadingMore(true);

  //   fetchMore({ variables: { take: ideasPerPage, skip: ideasPerPage } });

  //   setIsLoadingMore(false);
  // };

  const ideas: Ideas = data?.ideasPaginatedCursor;

  // const haveIdeas = ideas.length > 0;

  return (
    <QueryResult data={ideas} error={error} loading={loading}>
      <IdeaList ideas={ideas} />

      {/* {haveIdeas &&
        (isLoadingMore ? (
          <p>loading...</p>
        ) : (
          <button onClick={handleLoadMore}>More</button>
        ))} */}
    </QueryResult>
  );
};

CursorPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Cursor' description='Cursor page' hasHeader hasFooter>
      {page}
    </Layout>
  );
};

export default CursorPage;
