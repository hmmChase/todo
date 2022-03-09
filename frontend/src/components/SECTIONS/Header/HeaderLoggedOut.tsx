import { FC, useState } from 'react';
import styled from 'styled-components';

import LogInModal from '../../USER/LogInModal';
import SignUpModal from '../../USER/SignUpModal';
import Button from '../../REUSEABLE/Button';

const HeaderLoggedOut: FC = () => {
  const [modalDisplay, setModalDisplay] = useState('');

  return (
    <Container>
      {modalDisplay === 'login' && (
        <LogInModal close={() => setModalDisplay('')} />
      )}

      <ButtonLogIn alt type='text' onClick={() => setModalDisplay('login')}>
        Log in
      </ButtonLogIn>

      {modalDisplay === 'signup' && (
        <SignUpModal close={() => setModalDisplay('')} />
      )}

      <Button type='text' onClick={() => setModalDisplay('signup')}>
        Sign up
      </Button>
    </Container>
  );
};

export default HeaderLoggedOut;

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    margin-right: 0;
  }
`;

export const ButtonLogIn = styled(Button)`
  margin-right: 1rem;
`;
