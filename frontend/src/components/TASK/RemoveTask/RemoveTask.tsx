import { REMOVE_TASK } from '@/graphql/queries/task';
import { useMutation } from '@apollo/client';
import { XIconBtn } from '@/components/COMMON/IconBtn/IconBtn';
import type { FC, MouseEventHandler } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

interface Props {
  taskId: string;
}

interface Task {
  __ref: string;
}

const RemoveTask: FC<Props> = ({ taskId }) => {
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
