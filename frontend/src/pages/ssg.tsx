import type { NextPageWithLayout } from 'next';

// import { initializeApollo, addApolloState } from '../graphql/apolloClient';
// import { CURRENT_USER } from '../graphql/queries/user';
// import { READ_TASKS } from '../graphql/queries/task';
// import isLoggedIn from '../utils/isLoggedIn';
// import Layout from '../components/LAYOUTS/Layout';
// import Tasks from '../components/TASK/Tasks';

const SSGPage: NextPageWithLayout = props => {
  // const { tasksRes } = props;

  // const tasks = tasksRes.data?.tasks || [];

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

// SSGPage.getLayout = page => {
//   // const apolloClient = initializeApollo();

//   // const res = apolloClient.query({
//   //   query: CURRENT_USER,
//   //   creditials: 'include'
//   // });

//   // let currentUser;

//   // res.then(res => {

//   return (
//     <Layout
//       title='SSG'
//       description='SSG page'
//       hasHeader
//       hasFooter
//     >
//       {page}
//     </Layout>
//   );

//   // });
// };

// export const getStaticProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(['posts', 10], () => getPosts(10));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   };
// };

// export const getStaticProps = async ctx => {
//   const apolloClient = initializeApollo();

//   const res = await apolloClient.query({ query: READ_TASKS });

//   // addApolloState(apolloClient, { props: {} });

//   // return addApolloState(apolloClient, { props: { tasks: res.data.tasks } });

//   return { props: { tasksRes: res } };
// };

export default SSGPage;
