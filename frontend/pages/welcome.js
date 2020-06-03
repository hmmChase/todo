import Head from 'next/head';
import withApollo from '../graphql/withApollo';
import signedIn from '../utils/signedIn';
import redirect from '../utils/redirect';
import { title } from '../config';
import SignIn from '../components/SignIn';
import RequestReset from '../components/RequestReset';
import SignUp from '../components/SignUp';

const WelcomePage = () => (
  <main>
    <Head>
      <title>{`${title} | Welcome`}</title>
    </Head>

    <SignIn />

    <RequestReset />

    <SignUp />
  </main>
);

WelcomePage.getInitialProps = async (ctx) => {
  const { req, res } = ctx;

  /* SSR: must not be signed in */
  if (req && signedIn(req)) redirect(res, '/');

  return {};
};

export default withApollo({ ssr: false })(WelcomePage);
