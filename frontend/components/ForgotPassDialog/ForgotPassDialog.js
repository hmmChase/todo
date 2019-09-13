import Modal from '../Modal/Modal';
import * as sc from './ForgotPassDialog.style';

class ForgotPassDialog extends React.PureComponent {
  state = { modal: '' };

  render() {
    return (
      <>
        <sc.ForgotPassDialog
          value="Forgot password?"
          onClick={() => this.setState({ modal: 'requestReset' })}
        >
          Forgot password?
        </sc.ForgotPassDialog>

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
