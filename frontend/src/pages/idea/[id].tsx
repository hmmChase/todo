import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { READ_TASK } from '@/graphql/queries/task';
import App from '@/components/LAYOUTS/App/App';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import TaskDetail from '@/components/TASK/DETAIL/TaskDetail/TaskDetail';
import type { NextPageWithLayout } from 'next';
import type { Task } from '@/models/index';

const TaskPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [readTask, { data, error, loading }] = useLazyQuery(READ_TASK, {
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (router.isReady) readTask({ variables: { id: router.query.id } });
  }, [readTask, router.isReady, router.query.id]);

  const task: Task = data?.task;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {task && (
        <TaskDetail
          authorId={task?.author!.id}
          content={task?.content}
          taskId={task?.id}
        />
      )}
    </QueryResult>
  );
};

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // the path has not been generated.
// // pre-renders a page for every given slug
// export const getStaticPaths = async () => {
//   const paths = getAllTaskIds();

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: false };
// };

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // revalidation is enabled and a new request comes in
// export const getStaticProps = async props => {
//   const taskData = await getTaskData(params.id);

//   return {
//     props: { taskData },

//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 10
//   };
// };

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const response = await fetch('http://localhost:8008');

//   const data = await response.json();

//   // Get the paths we want to pre-render based on posts
//   // const paths = posts.map(post => ({ params: { slug: data } }));

//   const paths = [{ params: { slug: data } }];

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

TaskPage.getLayout = function getLayout(page) {
  return (
    <App title='Task' description='Task page' hasHeader hasFooter hasBackButton>
      {page}
    </App>
  );
};

export default TaskPage;
