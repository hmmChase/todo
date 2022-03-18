import { useState } from 'react';
import { NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import { Ideas } from '../models';
import { ideasPerPage } from '../constants/config';
import { READ_IDEAS_PAGINATED_CURSER } from '../graphql/queries/idea';
import IdeaList from '../components/IDEA/IdeaList';
import Layout from '../components/LAYOUTS/Layout';
import QueryResult from '../components/REUSEABLE/QueryResult';

const CurserPage: NextPageWithLayout = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(
    READ_IDEAS_PAGINATED_CURSER,
    {
      variables: { take: ideasPerPage, skip: null },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
    }
  );

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    fetchMore({ variables: { take: ideasPerPage, skip: ideasPerPage } });

    setIsLoadingMore(false);
  };

  const ideas: Ideas = data?.ideasPaginatedCurser;

  const haveIdeas = !!ideas.length;

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <IdeaList ideas={ideas} />

      {haveIdeas &&
        (isLoadingMore ? (
          <p>loading...</p>
        ) : (
          <button onClick={handleLoadMore}>More</button>
        ))}
    </QueryResult>
  );
};

CurserPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Curser' description='Curser page' hasHeader hasFooter>
      {page}
    </Layout>
  );
};

export default CurserPage;
