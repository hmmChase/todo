import PropTypes from 'prop-types';
import withApollo from '../../graphql/withApollo';
import signedIn from '../../utils/signedIn';
import redirect from '../../utils/redirect';
import Layout from '../../components/organisms/Layout/Layout';
import Header from '../../components/organisms/Header/Header';
import IdeaDetail from '../../components/organisms/IdeaDetail/IdeaDetail';
import Footer from '../../components/molecules/Footer/Footer';

const IdeaPage = (props) => (
  <Layout
    title={`Idea ${props.id}`}
    header={<Header title={props.id} />}
    content={<IdeaDetail ideaId={props.id} />}
    footer={<Footer />}
  />
);

IdeaPage.getInitialProps = (ctx) => {
  const { req, res, query } = ctx;

  /* SSR: must be signed in */
  if (req && !signedIn(req)) redirect(res, '/welcome');

  return { id: query.id };
};

IdeaPage.propTypes = { id: PropTypes.string.isRequired };

export default withApollo({ ssr: true })(IdeaPage);
