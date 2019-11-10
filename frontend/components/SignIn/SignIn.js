import SignInForm from '../SignInForm/SignInForm';
import ForgotPassDialog from '../ForgotPassDialog/ForgotPassDialog';
import * as sc from './SignIn.style';

const SignIn = () => (
  <sc.SignIn>
    <SignInForm />

    <ForgotPassDialog />
  </sc.SignIn>
);

export default SignIn;
