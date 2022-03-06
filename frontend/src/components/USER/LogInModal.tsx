import { FC } from 'react';
import styled from 'styled-components';

import Modal from '../REUSEABLE/Modal';
import HorizontalRule from '../REUSEABLE/HorizontalRule';
import LogInForm from './LogInForm';

interface Props {
  close: () => void;
}

const LogInModal: FC<Props> = props => {
  const { close } = props;

  return (
    <Modal close={close}>
      <Container>
        <Title>Log in</Title>

        <HorizontalRule />

        <LogInForm close={close} />
      </Container>
    </Modal>
  );
};

export default LogInModal;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fontSize.h3};
  margin: 0;
`;
