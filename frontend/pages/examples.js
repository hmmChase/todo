import Head from 'next/head';
import Examples from '../components/Examples/Examples';

const ExamplesPage = React.memo(() => (
  <>
    <Head>
      <title>next-graphql-starter | Examples</title>
    </Head>
    <Examples />
  </>
));

export default ExamplesPage;
