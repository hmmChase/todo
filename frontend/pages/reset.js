import { withRouter } from 'next/router';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const ResetPage = withRouter(props => (
  <ResetPassword resetToken={props.router.query.resetToken} />
));

export default ResetPage;
