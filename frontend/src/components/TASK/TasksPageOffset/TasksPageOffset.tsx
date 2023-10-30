import { useQuery } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components';

import { READ_TASKS_PAGINATED_OFFSET } from '@/graphql/queries/task';
import { tasksPerPage } from '@/constants/config';
import Button from '@/components/COMMON/Button/Button';
import Loading from '@/components/COMMON/Loading/Loading';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import Tasks from '@/components/TASK/Tasks/Tasks';
import type { Tasks as Taskss } from '@/models/index';

const TasksPageOffset = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // const [offset, setOffset] = useState(0);

  // const [page, setPage] = useState((offset + tasksPerPage) / tasksPerPage);

  const [page, setPage] = useState(0);

  const { data, error, loading, fetchMore } = useQuery(
    READ_TASKS_PAGINATED_OFFSET,
    {
      // variables: { offset, limit: tasksPerPage },

      variables: { limit: tasksPerPage, offset: page * tasksPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
    }
  );

  const handleChangePageBackwards = () => setPage(prev => prev - 1);

  const handleChangePageForwards = () => setPage(prev => prev + 1);

  // const handleChangePageBackwards = () => {
  //   const previousOffset = offset - tasksPerPage;

  //   setOffset(previousOffset);

  //   const previousPage = offset / tasksPerPage;

  //   setPage(previousPage);
  // };

  // const handleChangePageForwards = () => {
  //   const nextOffset = offset + tasksPerPage;

  //   setOffset(nextOffset);

  //   const nextPage = (nextOffset + tasksPerPage) / tasksPerPage;

  //   setPage(nextPage);
  // };

  // const handleLoadMore = () => {
  //   setIsLoadingMore(true);

  //   fetchMore({
  //     variables: { offset: offset + tasksPerPage, limit: tasksPerPage }
  //   });

  //   setIsLoadingMore(false);
  // };

  const tasks: Taskss = data?.tasksPaginatedOffset;

  // const haveTasks = !!tasks;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {tasks ? <Tasks tasks={tasks} /> : <p>There are no tasks</p>}

      {tasks &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <Nav>
            <Button
              disabled={!page}
              name='back'
              onClick={handleChangePageBackwards}
            >
              {'< Back'}
            </Button>

            <span>{page + 1}</span>

            <Button name='forward' onClick={handleChangePageForwards}>
              {'Next >'}
            </Button>
          </Nav>
        ))}
    </QueryResult>
  );
};

export default TasksPageOffset;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1 rem;
`;
