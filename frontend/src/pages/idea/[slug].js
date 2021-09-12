import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const IdeaRoute = props => {
  const isServer = typeof window === 'undefined';

  const date = new Date();

  console.log(
    'isServer:',
    isServer,
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

  const router = useRouter();

  const slug = router.asPath.split('/')[2];

  console.log('slug1: ', slug);

  const query = router.query;

  console.log('query1:', query);

  console.log('query2:', query.slug);

  return (
    <>
      <h1>Idea {slug}</h1>
    </>
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

IdeaRoute.getLayout = function getLayout(page) {
  return (
    <Layout title='Idea' description='Idea route' header>
      {page}
    </Layout>
  );
};

export default IdeaRoute;
