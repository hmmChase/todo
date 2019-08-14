import Head from '../components/Head/Head';
import Page from '../components/Page/Page';
import Home from '../components/Home/Home';

const IndexPage = React.memo(() => (
  <Page>
    <Head title="Home" />

    <Home />
  </Page>
));

export default IndexPage;
