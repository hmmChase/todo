import styled from 'styled-components';

import displayMsg from '@/constants/displayMsg';
import TaskItem from '@/components/TASK/TaskItem/TaskItem';
import type { Tasks as Taskss } from '@/models/index';

interface Props {
  tasks: Taskss;
}

const Tasks = ({ tasks }: Props) => (
  <>
    {tasks.length ? (
      <UL>
        {tasks.map(task => (
          <LI key={task.id}>
            <hr />

            <TaskItem
              authorId={task.author!.id}
              content={task.content}
              due={task.due}
              taskId={task.id}
            />
          </LI>
        ))}
      </UL>
    ) : (
      <p>{displayMsg.task.noTasks}</p>
    )}
  </>
);

export default Tasks;

const LI = styled.li`
  > hr {
    border-top: 1px solid ${props => props.theme.border.quaternary};
    margin: 0;
  }

  :first-of-type {
    > hr {
      display: none;
    }
  }
`;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  width: 100%;
`;
