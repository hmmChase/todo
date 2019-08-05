import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import * as sc from './SignOn.style';

const SignOn = React.memo(() => (
  <sc.signOn>
    <SignIn />

    <SignUp />
  </sc.signOn>
));

export default SignOn;
