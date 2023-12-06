import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/COMMON/Button/Button';
import TaskModal from '@/components/TASK/TaskModal/TaskModal';

const TaskButton = () => {
  const [modalName, setModalName] = useState('');

  return (
    <Container data-testid='header-logged-out'>
      {modalName === 'newTask' && <TaskModal close={() => setModalName('')} />}

      <Button name='newTask' onClick={() => setModalName('newTask')}>
        New Task
      </Button>
    </Container>
  );
};

export default TaskButton;

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  @media screen and (min-width: ${props => props.theme.width.page}) {
    margin-right: 0;
  }
`;
