import PropTypes from 'prop-types';

import Page from '../containers/Page/Page';
import Head from '../components/Head/Head';
import HeaderDetail from '../containers/HeaderDetail/HeaderDetail';
import IdeaDetail from '../components/IdeaDetail/IdeaDetail';
import Footer from '../components/Footer/Footer';
import * as sc from '../components/Styled/layout.style';

const IdeaPage = React.memo(props => (
  <Page>
    <sc.AntLayout>
      <Head title="Idea Details" />

      <sc.AntHeader>
        <HeaderDetail ideaId={props.ideaId} />
      </sc.AntHeader>

      <sc.AntContent>
        <IdeaDetail ideaId={props.ideaId} />
      </sc.AntContent>

      <sc.AntFooter>
        <Footer />
      </sc.AntFooter>
    </sc.AntLayout>
  </Page>
));

IdeaPage.getInitialProps = async ctx => {
  const ideaId = ctx.query.id;

  return { ideaId };
};

IdeaPage.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default IdeaPage;
