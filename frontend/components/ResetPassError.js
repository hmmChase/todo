import PropTypes from 'prop-types';
import {
  passResetTokenMissingError,
  passResetTokenExpiredError,
} from '../config';
import BackBtn from './BackBtn';

const ResetPassError = (props) => (
  <fieldset>
    <BackBtn path='/welcome' />

    {!props.isTokenPresent && <p>{passResetTokenMissingError}</p>}

    {props.isTokenPresent && props.isTokenExpired && (
      <p>{passResetTokenExpiredError}</p>
    )}
  </fieldset>
);

ResetPassError.propTypes = {
  isTokenPresent: PropTypes.bool.isRequired,
  isTokenExpired: PropTypes.bool.isRequired,
};

export default React.memo(ResetPassError);
