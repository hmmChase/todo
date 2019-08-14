import Head from '../components/Head/Head';
import RequestReset from '../components/RequestReset/RequestReset';
import isLoggedIn from '../utils/isLoggedIn';
import redirect from '../utils/redirect';

const RequestResetPage = React.memo(() => (
  <>
    <Head title="Request Reset" />

    <RequestReset />
  </>
));

RequestResetPage.getInitialProps = async ctx => {
  const loggedIn = await isLoggedIn(ctx.apolloClient);

  if (loggedIn) redirect(ctx, '/');

  return {};
};

export default RequestResetPage;
