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
    header={<Header />}
    content={<AllUsers />}
    footer={<Footer />}
  />
);

UsersPage.getInitialProps = (ctx) => {
  const { req, res } = ctx;

  /* must be signed in */
  if (signedIn(req)) return {};
  else redirect(res, '/welcome');
};

export default withApollo({ ssr: true })(UsersPage);
