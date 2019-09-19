import Page from '../containers/Page/Page';
import Head from '../containers/Head/Head';
import LayoutMain from '../containers/LayoutMain/LayoutMain';
import HeaderIndex from '../containers/HeaderIndex/HeaderIndex';
import Ideas from '../components/Ideas/Ideas';

const IndexPage = React.memo(() => (
  <Page>
    <Head title="Home" />

    <LayoutMain header={<HeaderIndex />} content={<Ideas />} />
  </Page>
));

export default IndexPage;
