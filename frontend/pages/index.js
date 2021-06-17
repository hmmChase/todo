// import order: react=>next=>libs=>utils=>config=>queries=>components=>css

import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import Layout from '../components/organisms/Layout/Layout';
import Header from '../components/organisms/Header/Header';
import IdeaCardForm from '../components/molecules/IdeaCardForm/IdeaCardForm';
import Ideas from '../components/organisms/Ideas/Ideas';
import Footer from '../components/molecules/Footer/Footer';

const IndexPage = () => (
  <Layout
    title='Home'
    header={
      <Header title='hmmStart'>
        <IdeaCardForm />
      </Header>
    }
    content={<Ideas />}
    footer={<Footer />}
  />
);

// getInitialProps is called on:
// - initial page load, server-side
// - page changes, client-side
IndexPage.getInitialProps = ctx => {
  // err, req, res only exists on initial page load (server-side)
  // pathname, query, asPath, AppTree always available (server & client)
  const { req, res } = ctx;

  // server-side auth routing (initial page load)
  /* SSR: must be signed in */
  if (req && !signedIn(req)) redirect(res, '/welcome');

  return {};
};

export default withApollo({ ssr: true })(IndexPage);
