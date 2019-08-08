import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import * as sc from './SignOn.style';

const SignOn = React.memo(() => (
  <sc.signOn>
    <sc.logo>
      <img src="static/ideabox.png" alt="ideabox" />

      <h1>IdeaBox</h1>
    </sc.logo>

    <SignIn />

    <hr />

    <SignUp />
  </sc.signOn>
));

export default SignOn;
