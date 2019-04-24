import PropTypes from 'prop-types';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import RequestReset from '../RequestReset/RequestReset';
import * as Styled from './PopUps.style';

class PopUps extends React.PureComponent {
  showPopUp = () => {
    switch (this.props.popUp) {
      case 'signIn':
        return (
          <SignIn
            close={() => this.props.setPopUp('')}
            requestReset={() => this.props.setPopUp('requestReset')}
          />
        );

      case 'signUp':
        return <SignUp close={() => this.props.setPopUp('')} />;

      case 'requestReset':
        return <RequestReset close={() => this.props.setPopUp('')} />;

      default:
        return null;
    }
  };

  render() {
    return (
      <Styled.divPopup>
        <Styled.divOuter onClick={() => this.props.setPopUp('')} />

        <Styled.divInner>{this.showPopUp()}</Styled.divInner>
      </Styled.divPopup>
    );
  }
}

PopUps.propTypes = {
  popUp: PropTypes.string.isRequired,
  setPopUp: PropTypes.func.isRequired
};

export default PopUps;
