// https://github.com/vercel/next.js/blob/master/errors/custom-error-no-custom-404.md

import withApollo from '../graphql/withApollo';
import Layout from '../components/Layout';
import Header from '../components/Header';
import BackBtn from '../components/BackBtn';
import Footer from '../components/Footer';

const FourOhFourPage = () => (
  <Layout
    title='404'
    header={<Header title='404' />}
    content={<BackBtn path='/' />}
    footer={<Footer />}
  />
);

export default withApollo({ ssr: false })(FourOhFourPage);
