import SignInForm from '../SignInForm/SignInForm';
import ForgotPassDialog from '../molecules/ForgotPassDialog/ForgotPassDialog';
import * as sc from './SignIn.style';

const SignIn = () => (
  <sc.SignIn>
    <SignInForm />

    <ForgotPassDialog />
  </sc.SignIn>
);

export default SignIn;
