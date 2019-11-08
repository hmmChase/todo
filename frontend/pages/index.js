import Head from '../components/Head/Head';
import LayoutMain from '../components/LayoutMain/LayoutMain';
import HeaderMain from '../components/HeaderMain/HeaderMain';
import Ideas from '../components/Ideas/Ideas';
import withApollo from '../graphql/withApollo';
import authenticate from '../utils/authenticate';

const IndexPage = () => (
  <>
    <Head title="Home" />

    <LayoutMain header={<HeaderMain />} content={<Ideas />} />
  </>
);

IndexPage.getInitialProps = ctx => {
  const { req, res, pathname } = ctx;

  if (req && res && pathname) {
    authenticate(req, res, pathname);
  }

  return {};
};

export default withApollo(IndexPage);
