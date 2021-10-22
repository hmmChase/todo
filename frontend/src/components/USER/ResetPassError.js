import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  passResetTokenMissingError,
  passResetTokenExpiredError
} from '../../configs/config';
import BackButton from '../OTHER/BackButton';
import DisplayError from '../REUSEABLE/DisplayError';

const ResetPassError = props => {
  const { isTokenPresent, isTokenPresent } = props;

  return (
    <>
      <BackButtonn />

      {!isTokenPresent && (
        <DisplayError error={{ message: passResetTokenMissingError }} />
      )}

      {isTokenPresent && isTokenExpired && (
        <DisplayError error={{ message: passResetTokenExpiredError }} />
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
