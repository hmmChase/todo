import PropTypes from 'prop-types';
import {
  passResetTokenMissingError,
  passResetTokenExpiredError
} from '../../../config';
import DisplayError from '../DisplayError/DisplayError';
import * as sc from './ResetPassError.style';

const ResetPassError = props => (
  <>
    <sc.BackBtnn path='/welcome' />

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
  isTokenExpired: PropTypes.bool.isRequired
};

export default React.memo(ResetPassError);
