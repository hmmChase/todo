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

  /* must not be signed in */
  if (signedIn(req)) redirect(res, '/');
  else return {};
};

export default withApollo({ ssr: false })(WelcomePage);
