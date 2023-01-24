import { FC } from 'react';
import styled from 'styled-components';

import BackButton from '@/components/COMMON/BackButton/BackButton';
import displayMessages from '@/constants/displayMessages';
import Notice from '@/components/COMMON/Notice/Notice';

interface Props {
  isTokenExpired: boolean;
  isTokenPresent: boolean;
}

const PassResetError: FC<Props> = ({ isTokenExpired, isTokenPresent }) => (
  <>
    <BackButtonn />

    {!isTokenPresent && (
      <Notice type='error'>
        {displayMessages.user.passReset.tokenMissing}
      </Notice>
    )}

    {isTokenPresent && isTokenExpired && (
      <Notice type='error'>
        {displayMessages.user.passReset.tokenExpired}
      </Notice>
    )}
  </>
);

export default PassResetError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
