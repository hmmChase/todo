import Head from 'next/head';
import Examples from '../components/Examples/Examples';

class ExamplePage extends React.PureComponent {
  render() {
    return (
      <>
        <Head>
          <title>next-graphql-starter | Examples</title>
        </Head>
        <Examples />
      </>
    );
  }
}

export default ExamplePage;
