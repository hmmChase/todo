import { FC } from 'react';
import styled from 'styled-components';

import BackButton from '../OTHER/BackButton';
import displayMessages from '../../constants/displayMessages';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

interface Props {
  isTokenExpired: boolean;
  isTokenPresent: boolean;
}

const PassResetError: FC<Props> = ({ isTokenExpired, isTokenPresent }) => (
  <>
    <BackButtonn />

    {!isTokenPresent && (
      <DisplayStatus status='error'>
        {displayMessages.user.passReset.tokenMissing}
      </DisplayStatus>
    )}

    {isTokenPresent && isTokenExpired && (
      <DisplayStatus status='error'>
        {displayMessages.user.passReset.tokenExpired}
      </DisplayStatus>
    )}
  </>
);

export default PassResetError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
