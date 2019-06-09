import Head from '../components/Head/Head';
import RequestReset from '../components/RequestReset/RequestReset';
import { redirect } from '../utils/redirect';
import { isLoggedIn } from '../utils/isLoggedIn';

const RequestResetPage = React.memo(() => (
  <>
    <Head title="Request Reset" />

    <RequestReset />
  </>
));

RequestResetPage.getInitialProps = async ctx => {
  const me = await isLoggedIn(ctx.apolloClient);

  if (me) redirect(ctx, '/');
};

export default RequestResetPage;
