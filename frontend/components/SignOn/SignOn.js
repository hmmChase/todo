import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import * as sc from './SignOn.style';

const SignOn = React.memo(() => (
  <sc.SignOn>
    <sc.Logo>
      <img src="static/ideabox.png" alt="ideabox" />

      <h1>Starter</h1>
    </sc.Logo>

    <SignIn />

    <hr />

    <SignUp />
  </sc.SignOn>
));

export default SignOn;
