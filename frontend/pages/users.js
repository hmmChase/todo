import Head from '../components/Head/Head';
import Users from '../components/Users/Users';
import redirect from '../utils/redirect';
import { isLoggedIn } from '../utils/isLoggedIn';

const UsersPage = React.memo(() => (
  <>
    <Head title="Users" />

    <Users />
  </>
));

UsersPage.getInitialProps = async ctx => {
  const me = await isLoggedIn(ctx.apolloClient);

  if (!me) redirect(ctx, '/');
};

export default UsersPage;
