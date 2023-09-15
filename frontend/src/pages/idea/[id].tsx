import { READ_IDEA } from '@/graphql/queries/idea';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import App from '@/components/LAYOUTS/App/App';
import IdeaDetail from '@/components/IDEA/DETAIL/IdeaDetail/IdeaDetail';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import type { Idea } from '@/models/index';
import type { NextPageWithLayout } from 'next';

const IdeaPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [readIdea, { data, error, loading }] = useLazyQuery(READ_IDEA, {
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (router.isReady) readIdea({ variables: { id: router.query.id } });
  }, [readIdea, router.isReady, router.query.id]);

  const idea: Idea = data?.idea;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {idea && (
        <IdeaDetail
          authorId={idea?.author!.id}
          content={idea?.content}
          ideaId={idea?.id}
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
    <App title='Idea' description='Idea page' hasHeader hasFooter hasBackButton>
      {page}
    </App>
  );
};

export default IdeaPage;
