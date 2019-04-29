/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import RequestReset from '../RequestReset/RequestReset';
import * as sc from './PopUps.style';

const PopUps = React.memo(props => {
  const showPopUp = () => {
    switch (props.popUp) {
      case 'signIn':
        return (
          <SignIn
            close={() => props.setPopUp('')}
            requestReset={() => props.setPopUp('requestReset')}
          />
        );

      case 'signUp':
        return <SignUp close={() => props.setPopUp('')} />;

      case 'requestReset':
        return <RequestReset close={() => props.setPopUp('')} />;

      default:
        return null;
    }
  };

  return (
    <sc.divPopup>
      <sc.divOuter onClick={() => props.setPopUp('')} />

      <sc.divInner>{showPopUp()}</sc.divInner>
    </sc.divPopup>
  );
});

PopUps.propTypes = {
  popUp: PropTypes.string.isRequired,
  setPopUp: PropTypes.func.isRequired
};

export default PopUps;
