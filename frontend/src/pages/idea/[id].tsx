import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { Idea } from '../../models';
import { READ_IDEA } from '../../graphql/queries/idea';
import IdeaDetail from '../../components/IDEA/DETAIL/IdeaDetail';
import Layout from '../../components/LAYOUTS/Layout';
import QueryResult from '../../components/REUSEABLE/QueryResult';

const IdeaPage: NextPageWithLayout = () => {
  const router = useRouter();

  const ideaId = router.query.id;

  const { data, error, loading } = useQuery(READ_IDEA, {
    fetchPolicy: 'cache-first',

    variables: { id: ideaId }
  });

  const idea: Idea = data?.idea;

  return (
    <QueryResult data={idea} error={error} loading={loading}>
      <IdeaDetail
        authorId={idea?.author!.id}
        content={idea?.content}
        ideaId={idea?.id}
      />
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

IdeaPage.getLayout = function getLayout(page) {
  return (
    <Layout
      title='Idea'
      description='Idea page'
      hasHeader
      hasFooter
      hasBackButton
    >
      {page}
    </Layout>
  );
};

export default IdeaPage;
