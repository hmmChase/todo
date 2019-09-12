import PropTypes from 'prop-types';

import Page from '../containers/Page/Page';
import Head from '../components/Head/Head';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';
import IdeaDetail from '../components/IdeaDetail/IdeaDetail';

import isLoggedIn from '../utils/isLoggedIn';
import redirect from '../utils/redirect';

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

      <sc.AntFooter />
    </sc.AntLayout>
  </Page>
));

IdeaPage.getInitialProps = async ctx => {
  const ideaId = ctx.query.id;
  // const loggedIn = await isLoggedIn(ctx.apolloClient);

  // if (!loggedIn) redirect(ctx, '/');

  return { ideaId };
};

IdeaPage.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default IdeaPage;
