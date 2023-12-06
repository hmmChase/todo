import { ReactiveVar } from '@apollo/client';
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
  useQuery
} from '@apollo/client';

import { CREATE_TASK } from '@/graphql/queries/task';

// Not used

// Component for adding a task item
export const AddTask = () => {
  let input;

  const [createTask] = useMutation(CREATE_TASK, {});
};

// export const createAddTask = (taskVar: ReactiveVar<boolean>) => {
//   const createNewTaskId = (allTasks: any) =>
//     allTasks.reduce((maxId: any, todo: any) => Math.max(todo.id, maxId), -1) +
//     1;

//   const createNewTask = (content: any, allTasks: any) => {
//     return { content, id: createNewTaskId(allTasks) };
//   };

//   return (content: any) => {
//     const allTasks = taskVar();

//     taskVar(allTasks.concat([createNewTask(content, allTasks)]));
//   };

//   return {};
// };
