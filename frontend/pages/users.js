import Head from 'next/head';
import Users from '../components/Users/Users';

const UsersPage = React.memo(() => (
  <>
    <Head>
      <title>next-graphql-starter | Users</title>
    </Head>

    <Users />
  </>
));

export default UsersPage;
