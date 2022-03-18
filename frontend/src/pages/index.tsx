import { NextPageWithLayout } from 'next';
import { useQuery } from '@apollo/client';

import { Ideas } from '../models';
import { READ_IDEAS } from '../graphql/queries/idea';
import IdeaList from '../components/IDEA/IdeaList';
import Layout from '../components/LAYOUTS/Layout';
import QueryResult from '../components/REUSEABLE/QueryResult';

const IndexPage: NextPageWithLayout = () => {
  const { loading, error, data } = useQuery(READ_IDEAS);

  const ideas: Ideas = data?.ideas;

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <IdeaList ideas={ideas} />
    </QueryResult>
  );
};

IndexPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Home' description='Home page' hasHeader hasFooter>
      {page}
    </Layout>
  );
};

export default IndexPage;
