import { TaskInputDebounceDelay } from '@/constants/config';
import { UPDATE_TASK } from '@/graphql/queries/task';
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';
import TaskDetailContent from '@/components/TASK/DETAIL/TaskDetailContent/TaskDetailContent';
import type { FC } from 'react';

interface Props {
  children: string;
  id: string;
}

const TaskDetailUpdate: FC<Props> = ({ children, id }) => {
  const [text, setText] = useState(children);

  const [updateTask] = useMutation(UPDATE_TASK, { onError: () => {} });

  // Executes on blur
  const debouncedFn = useCallback(
    () =>
      debounce(
        // (value: string) => updateTask({ variables: { content: value, id } }),
        () => updateTask({ variables: { content: text, id } }),

        TaskInputDebounceDelay
      ),
    [id, text, updateTask]
  );

  const onSetText = (text: string) => {
    setText(text);

    debouncedFn();
  };

  return <TaskDetailContent onSetText={onSetText}>{text}</TaskDetailContent>;
};

export default TaskDetailUpdate;
