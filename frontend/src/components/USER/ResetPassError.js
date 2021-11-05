import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  passResetTokenMissingError,
  passResetTokenExpiredError
} from '../../constants/config';
import BackButton from '../OTHER/BackButton';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

const ResetPassError = props => {
  const { isTokenPresent, isTokenPresent } = props;

  return (
    <>
      <BackButtonn />

      {!isTokenPresent && (
        <DisplayStatus
          status='error'
          error={{ message: passResetTokenMissingError }}
        />
      )}

      {isTokenPresent && isTokenExpired && (
        <DisplayStatus
          status='error'
          error={{ message: passResetTokenExpiredError }}
        />
      )}
    </>
  );
};

ResetPassError.propTypes = {
  isTokenExpired: PropTypes.bool.isRequired,
  isTokenPresent: PropTypes.bool.isRequired
};

export default ResetPassError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
