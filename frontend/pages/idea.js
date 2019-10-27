import PropTypes from 'prop-types';

import Head from '../components/Head/Head';
import LayoutMain from '../components/LayoutMain/LayoutMain';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';
import IdeaDetail from '../components/IdeaDetail/IdeaDetail';
import { withApollo } from '../graphql/withApollo';
import authenticate from '../utils/authenticate';

const IdeaPage = props => (
  <>
    <Head title="Idea Detail" />

    <LayoutMain
      header={<HeaderDetail ideaId={props.ideaId} />}
      content={<IdeaDetail ideaId={props.ideaId} />}
    />
  </>
);

IdeaPage.getInitialProps = ctx => {
  const { req, res, pathname, query } = ctx;

  if (req && res && pathname) {
    authenticate(req, res, pathname);
  }

  const ideaId = query.id;

  return { ideaId };
};

IdeaPage.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default withApollo(React.memo(IdeaPage));
