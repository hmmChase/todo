import { FC } from 'react';
import styled from 'styled-components';

import {
  passResetTokenMissingError,
  passResetTokenExpiredError
} from '../../constants/config';
import BackButton from '../OTHER/BackButton';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

interface Props {
  isTokenPresent: boolean;
  isTokenExpired: boolean;
}

const ResetPassError: FC<Props> = props => {
  const { isTokenPresent, isTokenExpired } = props;

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

export default ResetPassError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
