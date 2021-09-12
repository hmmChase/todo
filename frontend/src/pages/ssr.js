import { gql, useQuery } from '@apollo/client';

import { initializeApollo, addApolloState } from '../graphql/apolloClient';
import Layout from '../components/Layout';

const POSTS_PER_PAGE = 10;

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          slug
        }
      }
    }
  }
`;

const SSRPage = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null
    }
  });

  const posts = data?.posts?.edges?.map(edge => edge.node) || [];

  const havePosts = Boolean(posts.length);

  return (
    <Layout>
      <h1>SSR Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !havePosts ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <article
            key={post.databaseId}
            style={{
              border: '2px solid #eee',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '10px'
            }}
          >
            <h2>{post.title}</h2>
          </article>
        ))
      )}
    </Layout>
  );
};

export const getServerSideProps = async context => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_POSTS,
    variables: { first: POSTS_PER_PAGE, after: null }
  });

  return addApolloState(apolloClient, { props: {} });
};

export default SSRPage;
