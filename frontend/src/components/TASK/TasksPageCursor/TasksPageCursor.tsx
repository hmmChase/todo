import { tasksPerPage } from '@/constants/config';
import { READ_TASKS_PAGINATED_CURSOR } from '@/graphql/queries/task';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Tasks from '@/components/TASK/Tasks/Tasks';
import Loading from '@/components/COMMON/Loading/Loading';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import type { FC } from 'react';
import type { Tasks as Taskss } from '@/models/index';

const TasksPageCursor: FC = () => {
  // const [page, setPage] = useState(0);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, error, loading, fetchMore } = useQuery(
    READ_TASKS_PAGINATED_CURSOR,
    {
      variables: { pageSize: tasksPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
    }
  );

  const tasks: Taskss = data?.tasksPaginatedCursor.tasks;

  const hasMore = data?.tasksPaginatedCursor.hasMore;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {tasks ? <Tasks tasks={tasks} /> : <p>There are no tasks</p>}

      {tasks &&
        hasMore &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <button
            onClick={async () => {
              setIsLoadingMore(true);

              await fetchMore({
                variables: { after: data.tasksPaginatedCursor.cursor }
              });

              setIsLoadingMore(false);
            }}
          >
            Load More
          </button>
        ))}
    </QueryResult>
  );
};

export default TasksPageCursor;
