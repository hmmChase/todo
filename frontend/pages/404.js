import withApollo from '../graphql/withApollo';
import Layout from '../components/organisms/Layout/Layout';
import Header from '../components/organisms/Header/Header';
import BackBtn from '../components/molecules/BackBtn/BackBtn';
import Footer from '../components/molecules/Footer/Footer';

const FourOhFourPage = () => (
  <Layout
    title='404'
    header={<Header title='404' />}
    content={<BackBtn path='/' />}
    footer={<Footer />}
  />
);

export default withApollo({ ssr: false })(FourOhFourPage);
