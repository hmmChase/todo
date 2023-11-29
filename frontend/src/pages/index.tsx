import { useQuery } from '@apollo/client';
import type { NextPageWithLayout } from 'next';
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import type { GetServerSideProps } from 'next';

import { READ_TASKS } from '@/graphql/queries/task';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import Tasks from '@/components/TASK/Tasks/Tasks';
import type { Tasks as Taskss } from '@/models/index';
// import { CURRENT_USER } from '@/graphql/queries/user';
// import verifyUser from '@/utils/verifyUser';

const IndexPage: NextPageWithLayout = () => {
  const { data, error, loading } = useQuery(READ_TASKS);

  const tasks: Taskss = data?.tasks;

  // const router = useRouter();

  // const { data, loading, error } = useQuery(CURRENT_USER);
  // console.log('data:', data);

  // const user = data?.currentUser;

  // const shouldRedirect = !(loading || error || user);

  // console.log('shouldRedirect:', shouldRedirect);

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/login');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [shouldRedirect]);

  return (
    <>
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

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   // console.log('getServerSideProps req:', Object.keys(ctx.req));
//   // console.log('getServerSideProps headers:', Object.keys(ctx.req.headers));

//   const { req, res } = ctx;

//   const userPayload = verifyUser(req.headers.cookie);

//   if (!userPayload) {
//     res.writeHead(302, { Location: '/login' });

//     res.end();
//   }

//   return { props: {} };
// };

export default IndexPage;
