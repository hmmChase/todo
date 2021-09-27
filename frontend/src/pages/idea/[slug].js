import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { READ_IDEA } from '../../graphql/queries/idea';
import graphQLErrors from '../../utils/graphQLErrors';
import isLoggedIn from '../../utils/isLoggedIn';
import QueryResult from '../../components/REUSEABLE/QueryResult';
import Layout from '../../components/LAYOUTS/Layout';
import IdeaCard from '../../components/IDEA/IdeaCard';

const IdeaPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const slug = router.asPath.split('/')[2];

  const { loading, error, data } = useQuery(READ_IDEA, {
    variables: { id: slug },

    onError: error => {
      console.log('IdeaPage READ_IDEA error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const idea = data?.idea || {};

  return (
    <QueryResult error={errorMsg} loading={loading} data={data}>
      <IdeaCard id={idea.id} content={idea.content} />
    </QueryResult>
  );
};

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // the path has not been generated.
// // pre-renders a page for every given slug
// export const getStaticPaths = async () => {
//   const paths = getAllIdeaIds();

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: false };
// };

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // revalidation is enabled and a new request comes in
// export const getStaticProps = async props => {
//   const ideaData = await getIdeaData(params.id);

//   return {
//     props: { ideaData },

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

IdeaPage.getLayout = page => (
  <Layout
    title='Idea'
    description='Idea page'
    isLoggedIn={page.props.isLoggedIn}
    onIdeaPage
    hasHeader
    hasBackButton
  >
    {page}
  </Layout>
);

export const getServerSideProps = async ctx => {
  return { props: { isLoggedIn: isLoggedIn(ctx.req.headers) } };
};

export default IdeaPage;
