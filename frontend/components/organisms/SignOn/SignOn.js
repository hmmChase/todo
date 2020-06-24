import { title } from '../../../config';
import SignIn from '../SignIn/SignIn';
import ForgotPassDialog from '../../molecules/ForgotPassDialog/ForgotPassDialog';
import SignUp from '../SignUp/SignUp';
import * as sc from './SignOn.style';

const SignOn = () => (
  <sc.SignOn>
    <sc.Header>
      <sc.Img src='images/ideabox.png' alt='ideabox' />

      <sc.Title>{title}</sc.Title>
    </sc.Header>

    <sc.Content>
      <sc.ContentHalf>
        <SignIn />

        <ForgotPassDialog />
      </sc.ContentHalf>

      <sc.HR />

      <sc.ContentHalf>
        <SignUp />
      </sc.ContentHalf>
    </sc.Content>
  </sc.SignOn>
);

export default SignOn;
