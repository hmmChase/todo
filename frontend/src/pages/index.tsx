import { READ_IDEAS } from '@/graphql/queries/idea';
import { useQuery } from '@apollo/client';
import App from '@/components/LAYOUTS/App/App';
import Ideas from '@/components/IDEA/Ideas/Ideas';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import type { Ideas as Ideass } from '@/models/index';
import type { NextPageWithLayout } from 'next';

const IndexPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(READ_IDEAS);

  const ideas: Ideass = data?.ideas;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      <Ideas ideas={ideas} />
    </QueryResult>
  );
};

IndexPage.getLayout = function getLayout(page) {
  return (
    <App title='Home' description='Home page' hasHeader hasFooter>
      {page}
    </App>
  );
};

// export const getServerSideProps = (ctx: any) => {
//   // console.log('getServerSideProps req:', Object.keys(ctx.req));
//   // console.log('getServerSideProps headers:', Object.keys(ctx.req.headers));

//   return { props: {} };
// };

export default IndexPage;
