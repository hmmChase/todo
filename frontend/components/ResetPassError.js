import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  passResetTokenMissingError,
  passResetTokenExpiredError,
} from '../config';

const ResetPassError = (props) => (
  <fieldset>
    <h2>Reset Password</h2>

    {!props.isTokenPresent && <p>{passResetTokenMissingError}</p>}

    {props.isTokenPresent && props.isTokenExpired && (
      <p>{passResetTokenExpiredError}</p>
    )}

    <Link href={{ pathname: '/welcome' }}>
      <button aria-label='back button'>Back</button>
    </Link>
  </fieldset>
);

ResetPassError.propTypes = {
  isTokenPresent: PropTypes.bool.isRequired,
  isTokenExpired: PropTypes.bool.isRequired,
};

export default React.memo(ResetPassError);
