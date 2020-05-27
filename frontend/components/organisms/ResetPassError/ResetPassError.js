import PropTypes from 'prop-types';
import {
  passResetTokenMissingError,
  passResetTokenExpiredError,
} from '../../../config';
import BackBtn from '../../molecules/BackBtn/BackBtn';
import DisplayError from '../../molecules/DisplayError/DisplayError';

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
