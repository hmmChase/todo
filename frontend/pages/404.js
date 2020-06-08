// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

import withApollo from '../graphql/withApollo';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FourOhFourPage = () => (
  <Layout
    title='404'
    header={<Header title='404' />}
    content={<p>404</p>}
    footer={<Footer />}
  />
);

export default withApollo({ ssr: false })(FourOhFourPage);
