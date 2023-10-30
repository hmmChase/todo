import { useMutation } from '@apollo/client';
import type { MouseEventHandler } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

import { REMOVE_TASK } from '@/graphql/queries/task';
import { XIconBtn } from '@/components/COMMON/IconBtn/IconBtn';

interface Props {
  taskId: string;
}

interface Task {
  __ref: string;
}

const RemoveTask = ({ taskId }: Props) => {
  const update: MutationUpdaterFn = cache =>
    cache.modify({
      fields: {
        tasks(existingTasks = []) {
          // remove task
          const filteredTasks = existingTasks.filter(
            (task: Task) => task.__ref !== `Task:${taskId}`
          );

          return filteredTasks;
        }
      }
    });

  const [removeTask] = useMutation(REMOVE_TASK, {
    update: (cache, data) => update(cache, data),

    onError: () => {}
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    // prevent multiple clicks
    e.currentTarget.disabled = true;

    removeTask({ variables: { id: taskId } });
  };

  return <XIconBtn name='removeTask' onClick={handleClick} />;
};

export default RemoveTask;
