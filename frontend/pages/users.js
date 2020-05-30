import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import Layout from '../components/Layout';
import Header from '../components/Header';
import AllUsers from '../components/AllUsers';
import Footer from '../components/Footer';

const UsersPage = () => (
  <Layout
    title='Users'
    header={<Header title='Users:' />}
    content={<AllUsers />}
    footer={<Footer />}
  />
);

UsersPage.getInitialProps = (ctx) => {
  const { req, res } = ctx;

  /* SSR: must be signed in */
  if (req && !signedIn(req)) redirect(res, '/welcome');

  return {};
};

export default withApollo({ ssr: true })(UsersPage);
