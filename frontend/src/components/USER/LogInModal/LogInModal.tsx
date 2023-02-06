import HorizontalRule from '@/components/COMMON/HorizontalRule/HorizontalRule';
import LogInForm from '@/components/USER/LogInForm/LogInForm';
import Modal from '@/components/COMMON/Modal/Modal';
import styled from 'styled-components';
import type { FC } from 'react';

interface Props {
  close: () => void;
}

const LogInModal: FC<Props> = ({ close }) => (
  <Modal close={close}>
    <Container>
      <Title>Log in</Title>

      <HorizontalRule />

      <LogInForm close={close} />
    </Container>
  </Modal>
);

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
