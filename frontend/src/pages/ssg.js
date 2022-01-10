import { initializeApollo, addApolloState } from '../graphql/apolloClient';
import { CURRENT_USER } from '../graphql/queries/user';
import { READ_IDEAS } from '../graphql/queries/idea';
// import isLoggedIn from '../utils/isLoggedIn';
import Layout from '../components/LAYOUTS/Layout';
import Ideas from '../components/IDEA/Ideas';

const SSGPage = props => {
  const { ideasRes } = props;

  const ideas = ideasRes.data?.ideas || [];

  const havePosts = !!ideas.length;

  return (
    <>
      {ideasRes.loading ? (
        <p>Loading...</p>
      ) : ideasRes.error ? (
        <p>An error has occurred.</p>
      ) : !havePosts ? (
        <p>No ideas found.</p>
      ) : (
        <Ideas ideas={ideas} />
      )}
    </>
  );
};

SSGPage.getLayout = page => {
  // const apolloClient = initializeApollo();

  // const res = apolloClient.query({
  //   query: CURRENT_USER,
  //   creditials: 'include'
  // });

  // let currentUser;

  // res.then(res => {

  return (
    <Layout
      title='SSG'
      description='SSG page'
      // isLoggedIn={!!res.data.currentUser}
      hasHeader
      hasFooter
    >
      {page}
    </Layout>
  );

  // });
};

// export const getStaticProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(['posts', 10], () => getPosts(10));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   };
// };

export const getStaticProps = async ctx => {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({ query: READ_IDEAS });

  // addApolloState(apolloClient, { props: {} });

  // return addApolloState(apolloClient, { props: { ideas: res.data.ideas } });

  return { props: { ideasRes: res } };
};

export default SSGPage;
