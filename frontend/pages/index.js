import { withApollo } from '../graphql/withApollo';
import Page from '../components/Page/Page';
import Head from '../components/Head/Head';
import LayoutMain from '../components/LayoutMain/LayoutMain';
import HeaderMain from '../components/HeaderMain/HeaderMain';
import Ideas from '../components/Ideas/Ideas';
import authenticate from '../utils/authenticate';

const IndexPage = () => (
  <Page>
    <Head title="Home" />

    <LayoutMain header={<HeaderMain />} content={<Ideas />} />
  </Page>
);

IndexPage.getInitialProps = props => {
  const { req, apolloClient } = props;

  if (req) authenticate(req, apolloClient);

  return {};
};

export default withApollo(IndexPage);
