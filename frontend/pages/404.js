// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

// import withApollo from '../graphql/withApollo';
// import signedIn from '../utils/signedIn';
// import redirect from '../utils/redirect';
import Layout from '../components/organisms/Layout/Layout';
import Header from '../components/organisms/Header/Header';

const FourOhFourPage = () => (
  <Layout title='404' header={<Header title='404' />} content={<p>404</p>} />
);

// UsersPage.getInitialProps = (ctx) => {
//   const { req, res } = ctx;

//   /* SSR: must be signed in */
//   if (req && !signedIn(req)) redirect(res, '/welcome');

//   return {};
// };

export default FourOhFourPage;
