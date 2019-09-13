import Page from '../containers/Page/Page';
import Head from '../components/Head/Head';
import HeaderIndex from '../containers/HeaderIndex/HeaderIndex';
import Ideas from '../components/Ideas/Ideas';
import Footer from '../components/Footer/Footer';
import * as sc from '../components/Styled/layout.style';

const IndexPage = React.memo(() => (
  <Page>
    <sc.AntLayout>
      <Head title="Home" />

      <sc.AntHeader>
        <HeaderIndex />
      </sc.AntHeader>

      <sc.AntContent>
        <Ideas />
      </sc.AntContent>

      <sc.AntFooter>
        <Footer />
      </sc.AntFooter>
    </sc.AntLayout>
  </Page>
));

export default IndexPage;
