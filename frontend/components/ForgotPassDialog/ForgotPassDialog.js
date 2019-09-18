import RequestReset from '../RequestReset/RequestReset';
import * as sc from './ForgotPassDialog.style';

class ForgotPassDialog extends React.PureComponent {
  state = { visible: false };

  showModal = () => this.setState({ visible: true });

  handleCancel = () => this.setState({ visible: false });

  render() {
    return (
      <sc.ForgotPassDialog>
        <sc.ModalLink onClick={this.showModal}>Forgot password?</sc.ModalLink>

        <sc.ForgotPassModal
          title="Request a password reset"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <RequestReset />
        </sc.ForgotPassModal>
      </sc.ForgotPassDialog>
    );
  }
}

export default ForgotPassDialog;
