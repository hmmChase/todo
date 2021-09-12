import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ideasPerPage } from '../config';
import { READ_IDEAS_PAGINATED_OFFSET } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/Layout';
import IdeaList from '../components/IdeaList';

const CSRPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    READ_IDEAS_PAGINATED_OFFSET,
    {
      variables: { offset: 0, limit: ideasPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true,

      onError: async error => {
        console.log('Ideas READ_IDEAS error: ', error);

        setErrorMsg(graphQLErrors(error));
      }
    }
  );

  const ideas = data?.ideasPaginatedOffset || [];

  // const ideas = data?.ideas?.edges?.map(edge => edge.node) || [];

  const haveIdeas = Boolean(ideas.length);

  return (
    <>
      <h1>CSR Page</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !haveIdeas ? (
        <p>No ideas found.</p>
      ) : (
        <IdeaList ideas={data.ideasPaginatedOffset} />
      )}
    </>
  );
};

CSRPage.getLayout = function getLayout(page) {
  return (
    <Layout title='CSR' description='CSR page' header>
      {page}
    </Layout>
  );
};

export default CSRPage;
