import Head from 'next/head';
import Home from '../components/Home/Home';

const IndexPage = React.memo(() => (
  <>
    <Head>
      <title>next-graphql-starter | Home</title>
    </Head>

    <Home />
  </>
));

export default IndexPage;
