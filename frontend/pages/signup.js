import Head from '../components/Head/Head';
import SignUp from '../components/SignUp/SignUp';
import redirect from '../utils/redirect';
import { isLoggedIn } from '../utils/isLoggedIn';

const SignUpPage = React.memo(() => (
  <>
    <Head title="Sign Up" />

    <SignUp />
  </>
));

SignUpPage.getInitialProps = async ctx => {
  const me = await isLoggedIn(ctx.apolloClient);

  if (me) redirect(ctx, '/');
};

export default SignUpPage;
