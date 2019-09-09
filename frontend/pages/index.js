import Page from '../containers/Page/Page';
import Head from '../components/Head/Head';
import HeaderIndex from '../components/HeaderIndex/HeaderIndex';
import IdeaCardList from '../components/IdeaCardList/IdeaCardList';
import * as sc from '../components/Styled/layout.style';

const IndexPage = React.memo(() => (
  <Page>
    <sc.AntLayout>
      <Head title="Home" />

      <sc.AntHeader>
        <HeaderIndex />
      </sc.AntHeader>

      <sc.AntContent>
        <IdeaCardList />
      </sc.AntContent>

      <sc.AntFooter />
    </sc.AntLayout>
  </Page>
));

export default IndexPage;
