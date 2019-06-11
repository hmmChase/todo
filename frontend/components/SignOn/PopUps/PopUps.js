/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import PopUpSignIn from '../PopUpSignIn/PopUpSignIn';
import PopUpSignUp from '../PopUpSignUp/PopUpSignUp';
import PopUpRequestReset from '../PopUpRequestReset/PopUpRequestReset';
import * as sc from './PopUps.style';

const PopUps = React.memo(props => {
  const showPopUp = () => {
    switch (props.popUp) {
      case 'signIn':
        return (
          <PopUpSignIn
            close={() => props.setPopUp('')}
            requestReset={() => props.setPopUp('requestReset')}
          />
        );

      case 'signUp':
        return <PopUpSignUp close={() => props.setPopUp('')} />;

      case 'requestReset':
        return <PopUpRequestReset close={() => props.setPopUp('')} />;

      default:
        return null;
    }
  };

  return (
    <sc.divPopup snapshot="PopUps">
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
