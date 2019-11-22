import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { title } from '../../constants';
import * as sc from './SignOn.style';

const SignOn = () => (
  <sc.SignOn>
    <sc.Header>
      <sc.Img src='static/images/ideabox.png' alt='ideabox' />

      <sc.Title data-axe-reject={true}>{title}</sc.Title>
    </sc.Header>

    <sc.Content>
      <SignIn />

      <sc.HR />

      <SignUp />
    </sc.Content>
  </sc.SignOn>
);

export default SignOn;
