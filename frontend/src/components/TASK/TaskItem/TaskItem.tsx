import styled from 'styled-components';
// import { useContext } from 'react';

// import { UserCtx } from '@/context/User';
// import RemoveTask from '@/components/TASK/RemoveTask/RemoveTask';
// import TaskDetailIcon from '@/components/TASK/DETAIL/TaskDetailIcon/TaskDetailIcon';

interface Props {
  authorId: string;
  content: string;
  taskId: string;
}

const TaskItem = ({ authorId, content, taskId }: Props) => {
  // const { user } = useContext(UserCtx);

  // const currentUserIsAdmin = user?.role === 'ADMIN';
  // const currentUserIsAuthor = user?.id === authorId;
  // const currentUserCanDeleteTask = currentUserIsAdmin || currentUserIsAuthor;

  return (
    <Article>
      <Content>{content}</Content>

      {/* <TaskItemBtns data-testid='TaskItemBtns'>
        <TaskDetailIconn taskId={taskId} />

        {currentUserCanDeleteTask && <RemoveTask taskId={taskId} />}
      </TaskItemBtns> */}
    </Article>
  );
};

export default TaskItem;

const Article = styled.article`
  display: flex;
  padding: 1rem;
`;

const Content = styled.p`
  flex-grow: 1;
  margin: 0 0.25rem 0 0;
`;

// const TaskItemBtns = styled.div`
//   display: flex;
// `;

// const TaskDetailIconn = styled(TaskDetailIcon)`
//   margin-right: 0.25rem;
// `;
