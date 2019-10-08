import { withApollo } from '../graphql/withApollo';
import Page from '../containers/Page/Page';
import Head from '../containers/Head/Head';
import LayoutMain from '../containers/LayoutMain/LayoutMain';
import HeaderMain from '../containers/HeaderMain/HeaderMain';
import Ideas from '../components/Ideas/Ideas';
import { cookieAuth, graphQLAuth } from '../utils/authenticate';

const IndexPage = React.memo(() => (
  <Page>
    <Head title="Home" />

    <LayoutMain header={<HeaderMain />} content={<Ideas />} />
  </Page>
));

IndexPage.getInitialProps = async props => {
  const { req, apolloClient } = props;

  if (req) cookieAuth(req, apolloClient);
  // await graphQLAuth(apolloClient);

  return {};
};

export default withApollo(IndexPage);
