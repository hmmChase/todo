import styled from 'styled-components';

import type { Tasks as Taskss } from '@/models/index';
// import Tasks from '@/components/TASK/Tasks/Tasks';

interface Props {
  email: string;
  tasks?: Taskss;
  role: string;
  userId: string;
}

const TaskItem = ({ email, tasks, role, userId }: Props) => (
  <List>
    <ListItem>
      <ItemLabel>Id:</ItemLabel>

      {userId}
    </ListItem>

    <ListItem>
      <ItemLabel>Email:</ItemLabel>

      {email}
    </ListItem>

    <ListItem>
      <ItemLabel>Role:</ItemLabel>

      {role}
    </ListItem>

    {/* {tasks && (
      <ListItem>
        <ItemLabel>Tasks:</ItemLabel>

        <Tasks tasks={tasks} />
      </ListItem>
    )} */}
  </List>
);

export default TaskItem;

const List = styled.ul`
  /* display: flex; */
  /* flex-direction: column; */
  padding: 0rem;
`;

const ListItem = styled.li`
  align-items: center;
  display: flex;
  margin: 0;
`;

const ItemLabel = styled.p`
  font-weight: 600;
  margin: 0.25rem;
`;
