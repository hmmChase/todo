import styled from 'styled-components';

import CreateTask from '@/components/TASK/CreateTask/CreateTask';
import HorizontalRule from '@/components/COMMON/HorizontalRule/HorizontalRule';
import Modal from '@/components/COMMON/Modal/Modal';

interface Props {
  close: () => void;
}

const TaskModal = ({ close }: Props) => (
  <Modal close={close}>
    <Container>
      <Title>New Task</Title>

      <HorizontalRule />

      <CreateTask />
    </Container>
  </Modal>
);

export default TaskModal;

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
