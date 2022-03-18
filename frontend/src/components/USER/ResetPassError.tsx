import { FC } from 'react';
import styled from 'styled-components';

import {
  passResetTokenExpiredError,
  passResetTokenMissingError
} from '../../constants/config';
import BackButton from '../OTHER/BackButton';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

interface Props {
  isTokenExpired: boolean;
  isTokenPresent: boolean;
}

const ResetPassError: FC<Props> = ({ isTokenExpired, isTokenPresent }) => (
  <>
    <BackButtonn />

    {!isTokenPresent && (
      <DisplayStatus status='error'>{passResetTokenMissingError}</DisplayStatus>
    )}

    {isTokenPresent && isTokenExpired && (
      <DisplayStatus status='error'>{passResetTokenExpiredError}</DisplayStatus>
    )}
  </>
);

export default ResetPassError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
