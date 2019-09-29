import SignInForm from '../../components/SignInForm/SignInForm';
import ForgotPassDialog from '../../components/ForgotPassDialog/ForgotPassDialog';
import * as sc from './SignIn.style';

const SignIn = React.memo(() => (
  <sc.SignIn>
    <SignInForm />

    <ForgotPassDialog />
  </sc.SignIn>
));

export default SignIn;
