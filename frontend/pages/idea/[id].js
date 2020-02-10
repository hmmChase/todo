import PropTypes from 'prop-types';
import Head from '../../components/Head/Head';
import LayoutMain from '../../components/LayoutMain/LayoutMain';
import HeaderDetail from '../../components/HeaderDetail/HeaderDetail';
import IdeaDetail from '../../components/IdeaDetail/IdeaDetail';
import withApollo from '../../graphql/withApollo';
import authenticate from '../../utils/authenticate';

const IdeaPage = props => {
  return (
    <>
      <Head title='Idea Detail' />

      <LayoutMain
        header={<HeaderDetail ideaId={props.id} />}
        content={<IdeaDetail ideaId={props.id} />}
      />
    </>
  );
};

IdeaPage.getInitialProps = ctx => {
  const { req, res, pathname, query } = ctx;

  if (req && res && pathname) authenticate(req, res, pathname);

  return { id: query.id };
};

IdeaPage.propTypes = { id: PropTypes.string.isRequired };

export default withApollo(IdeaPage);
