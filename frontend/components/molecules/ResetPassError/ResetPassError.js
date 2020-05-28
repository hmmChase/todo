import PropTypes from 'prop-types';
import {
  passResetTokenMissingError,
  passResetTokenExpiredError,
} from '../../../config';
import BackBtn from '../BackBtn/BackBtn';
import DisplayError from '../DisplayError/DisplayError';

const ResetPassError = (props) => (
  <>
    <BackBtn path='/welcome' />

    {!props.isTokenPresent && (
      <DisplayError error={{ message: passResetTokenMissingError }} />
    )}

    {props.isTokenPresent && props.isTokenExpired && (
      <DisplayError error={{ message: passResetTokenExpiredError }} />
    )}
  </>
);

ResetPassError.propTypes = {
  isTokenPresent: PropTypes.bool.isRequired,
  isTokenExpired: PropTypes.bool.isRequired,
};

export default React.memo(ResetPassError);
