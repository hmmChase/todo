import Layout from '../components/Layout';
import Header from '../components/Header';

const AboutPage = () => (
  <section>
    <h2>About</h2>
  </section>
);

AboutPage.getLayout = function getLayout(page) {
  return (
    <Layout title='About' description='About page'>
      <Header />

      {page}
    </Layout>
  );
};

export default AboutPage;
