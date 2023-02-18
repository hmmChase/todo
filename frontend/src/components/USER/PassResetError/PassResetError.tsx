import BackButton from '@/components/COMMON/BackButton/BackButton';
import displayMsg from '@/constants/displayMsg';
import Notice from '@/components/COMMON/Notice/Notice';
import styled from 'styled-components';
import type { FC } from 'react';

interface Props {
  isTokenExpired: boolean;
  isTokenPresent: boolean;
}

const PassResetError: FC<Props> = ({ isTokenExpired, isTokenPresent }) => (
  <>
    <BackButtonn />

    {!isTokenPresent && (
      <Notice type='error'>{displayMsg.user.passReset.tokenMissing}</Notice>
    )}

    {isTokenPresent && isTokenExpired && (
      <Notice type='error'>{displayMsg.user.passReset.tokenExpired}</Notice>
    )}
  </>
);

export default PassResetError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
