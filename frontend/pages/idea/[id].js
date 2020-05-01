import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { devConErr } from '../../utils/devCon';
import Layout from '../../components/organisms/Layout/Layout';
import Header from '../../components/organisms/Header/Header';
import IdeaDetail from '../../components/organisms/IdeaDetail/IdeaDetail';
import Footer from '../../components/molecules/Footer/Footer';
import withApollo from '../../graphql/withApollo';
import redirect from '../../utils/redirect';

const IdeaPage = (props) => (
  <Layout
    title='Idea Detail'
    header={<Header ideaId={props.id} />}
    content={<IdeaDetail ideaId={props.id} />}
    footer={<Footer />}
  />
);

IdeaPage.getInitialProps = (ctx) => {
  // err, req, res only exists on initial page load (server-side)
  // pathname, query, asPath, AppTree always available (server & client)
  const { req, res, query } = ctx;

  // server-side auth routing (initial page load)
  /* must be signed in */
  if (typeof window === 'undefined') {
    // If cookie header present
    if (req && req.headers && req.headers.cookie) {
      // Parse Refresh token
      const refreshToken = req.headers.cookie.replace('rt=', '');

      // If Refresh token
      if (refreshToken) {
        try {
          // Verify Refresh token
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          return { id: query.id };
        } catch (error) {
          // If Refresh token invalid
          devConErr(['Refresh token verify error: ', error]);
        }
      }
    }

    // no cookie, token, or valid jwt
    redirect(res, '/welcome');
  }

  return { id: query.id };
};

IdeaPage.propTypes = { id: PropTypes.string.isRequired };

export default withApollo({ ssr: true })(IdeaPage);
