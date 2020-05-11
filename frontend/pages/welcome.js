import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import SignIn from '../components/organisms/SignIn/SignIn';
import RequestReset from '../components/organisms/RequestReset/RequestReset';
import SignUp from '../components/organisms/SignUp/SignUp';

// import Layout from '../components/organisms/Layout/Layout';
// import SignOn from '../components/organisms/SignOn/SignOn';

const WelcomePage = () => (
  <>
    <SignIn />

    <RequestReset />

    <SignUp />
  </>
);

// const WelcomePage = () => <Layout title='Welcome' content={<SignOn />} />;

WelcomePage.getInitialProps = async (ctx) => {
  const { req, res } = ctx;

  /* SSR: must not be signed in */
  if (req && signedIn(req)) redirect(res, '/');

  return {};
};

export default withApollo({ ssr: false })(WelcomePage);
