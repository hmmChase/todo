import { withApollo } from '../graphql/withApollo';
import Page from '../containers/Page/Page';
import Head from '../containers/Head/Head';
import LayoutMain from '../containers/LayoutMain/LayoutMain';
import HeaderMain from '../containers/HeaderMain/HeaderMain';
import Ideas from '../components/Ideas/Ideas';

const IndexPage = React.memo(() => (
  <Page>
    <Head title="Home" />

    <LayoutMain header={<HeaderMain />} content={<Ideas />} />
  </Page>
));

export default withApollo(IndexPage);
