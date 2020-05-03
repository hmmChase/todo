import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import withApollo from '../../graphql/withApollo';
import redirect from '../../utils/redirect';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import IdeaDetail from '../../components/IdeaDetail';
import Footer from '../../components/Footer';

const IdeaPage = (props) => (
  <Layout
    title='Idea Detail'
    header={<Header ideaId={props.id} />}
    content={<IdeaDetail ideaId={props.id} />}
    footer={<Footer />}
  />
);

IdeaPage.getInitialProps = (ctx) => {
  const { req, res, query } = ctx;

  /* must be signed in */
  if (typeof window === 'undefined') {
    if (req && req.headers && req.headers.cookie) {
      const refreshToken = req.headers.cookie.replace('rt=', '');

      if (refreshToken) {
        try {
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          return { id: query.id };
        } catch (error) {
          console.error('Refresh token verify error: ', error);
        }
      }
    }

    redirect(res, '/welcome');
  }

  return { id: query.id };
};

IdeaPage.propTypes = { id: PropTypes.string.isRequired };

export default withApollo({ ssr: true })(IdeaPage);
