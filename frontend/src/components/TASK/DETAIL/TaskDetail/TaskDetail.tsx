import { useContext } from 'react';
import { UserCtx } from '@/context/User';
import TaskDetailUpdate from '@/components/TASK/DETAIL/TaskDetailUpdate/TaskDetailUpdate';
import RemoveTask from '@/components/TASK/RemoveTask/RemoveTask';
import styled from 'styled-components';

interface Props {
  authorId: string;
  content: string;
  taskId: string;
}

const TaskDetail = ({ authorId, content, taskId }: Props) => {
  const { user } = useContext(UserCtx);

  const currentUserIsAdmin = user?.role === 'ADMIN';
  const currentUserIsAuthor = user?.id === authorId;
  const currentUserAuthorized = currentUserIsAdmin || currentUserIsAuthor;

  return (
    <Section>
      {currentUserAuthorized ? (
        <TaskDetailUpdate id={taskId}>{content}</TaskDetailUpdate>
      ) : (
        <p>{content}</p>
      )}

      {currentUserAuthorized && (
        <RemoveTaskWrap>
          <RemoveTask taskId={taskId} />
        </RemoveTaskWrap>
      )}
    </Section>
  );
};

export default TaskDetail;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 2rem 1rem;
`;

const RemoveTaskWrap = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;
`;
