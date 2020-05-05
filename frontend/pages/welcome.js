import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import SignIn from '../components/SignIn';
import RequestReset from '../components/RequestReset';
import SignUp from '../components/SignUp';

const WelcomePage = () => (
  <>
    <SignIn />

    <RequestReset />

    <SignUp />
  </>
);

WelcomePage.getInitialProps = async (ctx) => {
  const { req, res } = ctx;

  /* SSR: must not be signed in */
  if (req && signedIn(req)) redirect(res, '/');

  return {};
};

export default withApollo({ ssr: false })(WelcomePage);
