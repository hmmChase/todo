// import { SignOut, modals } from '..';
import Modal from '../Modal/Modal';
import * as sc from './ForgotPassDialog.style';

class ForgotPassDialog extends React.PureComponent {
  state = { modal: '' };

  render() {
    return (
      <>
        <sc.aForgotPass
          value="Forgot password?"
          onClick={() => this.setState({ modal: 'requestReset' })}
        >
          Forgot password?
        </sc.aForgotPass>

        {this.state.modal && (
          <Modal
            modal={this.state.modal}
            setModal={modalName => this.setState({ modal: modalName })}
          />
        )}
      </>
    );
  }
}

export default ForgotPassDialog;
