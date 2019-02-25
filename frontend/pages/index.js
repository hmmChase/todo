import Head from 'next/head';
import Home from '../components/Home/Home';

class IndexPage extends React.PureComponent {
  render() {
    return (
      <>
        <Head>
          <title>next-graphql-starter | Home</title>
        </Head>
        <Home />
      </>
    );
  }
}

export default IndexPage;
