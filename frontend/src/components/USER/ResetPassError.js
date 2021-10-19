import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  passResetTokenMissingError,
  passResetTokenExpiredError
} from '../../configs/config';
import BackButton from '../OTHER/BackButton';
import DisplayError from '../REUSEABLE/DisplayError';

const ResetPassError = props => (
  <>
    <BackButtonn />

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

export default ResetPassError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
