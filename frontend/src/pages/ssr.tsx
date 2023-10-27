import type { NextPageWithLayout } from 'next';

// import { initializeApollo, addApolloState } from '../graphql/apolloClient';
// import { READ_TASKS } from '../graphql/queries/task';
// import isLoggedIn from '../utils/isLoggedIn';
// import Layout from '../components/LAYOUTS/Layout';
// import Tasks from '../components/TASK/Tasks';

const SSRPage: NextPageWithLayout = props => {
  // const { tasksRes } = props;

  // const tasks = tasksRes?.data?.tasks || [];

  // const havePosts = !!tasks.length;

  return (
    <>
      {/* {tasksRes.loading ? ( */}
      <p>Loading...</p>
      {/* ) : tasksRes.error ? ( */}
      {/* <p>An error has occurred.</p> */}
      {/* ) : !havePosts ? ( */}
      {/* <p>No tasks found.</p> */}
      {/* ) : ( */}
      {/* <Tasks tasks={tasks} /> */}
      {/* )} */}
    </>
  );
};

// SSRPage.getLayout = page => (
//   <Layout
//     title='SSR'
//     description='SSR page'
//     hasHeader
//     hasFooter
//   >
//     {page}
//   </Layout>
// );

// export async function getServerSideProps(ctx) {
//   const apolloClient = initializeApollo();

//   const res = await apolloClient.query({ query: READ_TASKS });

//   // addApolloState(apolloClient, { props: {} });

//   // return addApolloState(apolloClient, { props: { tasks: res.data.tasks } });

//   return {
//     props: { tasksRes: res, isLoggedIn: isLoggedIn(ctx.req.headers) }
//   };
// }

export default SSRPage;
