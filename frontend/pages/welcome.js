import Head from '../components/Head/Head';
import SignOn from '../components/SignOn/SignOn';
import withApollo from '../graphql/withApollo';
import authenticate from '../utils/authenticate';

const WelcomePage = () => (
  <>
    <Head title="Welcome" />

    <SignOn />
  </>
);

WelcomePage.getInitialProps = ctx => {
  const { req, res, pathname } = ctx;

  if (req && res && pathname) {
    authenticate(req, res, pathname);
  }

  return {};
};

export default withApollo(WelcomePage);
