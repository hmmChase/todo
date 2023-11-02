import { useQuery } from '@apollo/client';
import type { NextPageWithLayout } from 'next';
// import Head from 'next/head';

import { READ_TASKS } from '@/graphql/queries/task';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import Tasks from '@/components/TASK/Tasks/Tasks';
import type { Tasks as Taskss } from '@/models/index';

const IndexPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(READ_TASKS);

  const tasks: Taskss = data?.tasks;

  return (
    <>
      {/* <Head>
        <title>Home</title>
        <meta name='description' content='Home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}

      <main>
        <QueryResult
          data={data}
          error={error}
          loading={loading}
          showError={true}
          showLoading={true}
        >
          <Tasks tasks={tasks} />
        </QueryResult>
      </main>
    </>
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
