// import Page from '../components/Page/Page';
import Head from '../components/Head/Head';
import LayoutMain from '../components/LayoutMain/LayoutMain';
import HeaderMain from '../components/HeaderMain/HeaderMain';
import Ideas from '../components/Ideas/Ideas';
import withApollo from '../graphql/withApollo';
import authenticate from '../utils/authenticate';

// If no stylesheet is imported in the first route page rendered by client,
// nextjs links won't work
// https://github.com/zeit/next-plugins/issues/282
// https://github.com/zeit/next.js/issues/8626
// https://github.com/zeit/next.js/issues/5291

const IndexPage = () => (
  <>
    <Head title='Home' />

    <LayoutMain header={<HeaderMain />} content={<Ideas />} />
  </>
);

IndexPage.getInitialProps = ctx => {
  const { req, res, pathname } = ctx;

  if (req && res && pathname) authenticate(req, res, pathname);

  return {};
};

export default withApollo(IndexPage);
