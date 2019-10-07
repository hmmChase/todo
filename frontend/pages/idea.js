import PropTypes from 'prop-types';

import { withApollo } from '../graphql/withApollo';
import Page from '../containers/Page/Page';
import Head from '../containers/Head/Head';
import LayoutMain from '../containers/LayoutMain/LayoutMain';
import HeaderDetail from '../containers/HeaderDetail/HeaderDetail';
import IdeaDetail from '../components/IdeaDetail/IdeaDetail';
import authenticate from '../utils/authenticate';

const IdeaPage = React.memo(props => (
  <Page>
    <Head title="Idea Detail" />

    <LayoutMain
      header={<HeaderDetail ideaId={props.ideaId} />}
      content={<IdeaDetail ideaId={props.ideaId} />}
    />
  </Page>
));

IdeaPage.getInitialProps = async props => {
  const { req, query, apolloClient } = props;
  const ideaId = query.id;

  if (req) authenticate(req, apolloClient);

  return { ideaId };
};

IdeaPage.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default withApollo(IdeaPage);
