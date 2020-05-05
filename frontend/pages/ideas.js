import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import Layout from '../components/Layout';
import Header from '../components/Header';
import AllIdeas from '../components/AllIdeas';
import Footer from '../components/Footer';

const IdeasPage = () => (
  <Layout
    title='Ideas'
    header={<Header />}
    content={<AllIdeas />}
    footer={<Footer />}
  />
);

IdeasPage.getInitialProps = (ctx) => {
  const { req, res } = ctx;

  /* SSR: must be signed in */
  if (req && !signedIn(req)) redirect(res, '/welcome');

  return {};
};

export default withApollo({ ssr: true })(IdeasPage);
