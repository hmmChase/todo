import Head from '../components/Head/Head';
import SignIn from '../components/SignIn/SignIn';
import redirect from '../utils/redirect';
import { isLoggedIn } from '../utils/isLoggedIn';

const SignInPage = React.memo(() => (
  <>
    <Head title="Sign In" />

    <SignIn />
  </>
));

SignInPage.getInitialProps = async ctx => {
  const me = await isLoggedIn(ctx.apolloClient);

  if (me) redirect(ctx, '/');
};

export default SignInPage;
