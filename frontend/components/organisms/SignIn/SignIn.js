import PropTypes from 'prop-types';
import SignInForm from '../SignInForm/SignInForm';
import ForgotPassDialog from '../../molecules/ForgotPassDialog/ForgotPassDialog';
// import * as sc from './SignIn.style';

const SignIn = (props) => (
  <div className={props.className}>
    <SignInForm />

    <ForgotPassDialog />
  </div>
);

SignIn.propTypes = {
  className: PropTypes.string,
};

export default SignIn;
