import PropTypes from 'prop-types';

import Page from '../containers/Page/Page';
import Head from '../containers/Head/Head';
import LayoutMain from '../containers/LayoutMain/LayoutMain';
import HeaderDetail from '../containers/HeaderDetail/HeaderDetail';
import IdeaDetail from '../components/IdeaDetail/IdeaDetail';

const IdeaPage = React.memo(props => (
  <Page>
    <Head title="Idea Detail" />

    <LayoutMain
      header={<HeaderDetail ideaId={props.ideaId} />}
      content={<IdeaDetail ideaId={props.ideaId} />}
    />
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
