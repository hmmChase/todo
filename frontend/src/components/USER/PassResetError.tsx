import { FC } from 'react';
import styled from 'styled-components';

import BackButton from '../REUSEABLE/BackButton';
import displayMessages from '../../constants/displayMessages';
import Error from '../REUSEABLE/Error';

interface Props {
  isTokenExpired: boolean;
  isTokenPresent: boolean;
}

const PassResetError: FC<Props> = ({ isTokenExpired, isTokenPresent }) => (
  <>
    <BackButtonn />

    {!isTokenPresent && (
      <Error error={displayMessages.user.passReset.tokenMissing} />
    )}

    {isTokenPresent && isTokenExpired && (
      <Error error={displayMessages.user.passReset.tokenExpired} />
    )}
  </>
);

export default PassResetError;

export const BackButtonn = styled(BackButton)`
  margin: 1rem 0 2rem 0;
`;
