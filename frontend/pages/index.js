import Head from '../components/Head/Head';
import Home from '../components/Home/Home';

const IndexPage = React.memo(() => (
  <>
    <Head title="Home" />

    <Home />
  </>
));

export default IndexPage;
