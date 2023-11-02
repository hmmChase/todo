import { ReactiveVar } from '@apollo/client';

// Not used

const createAddTask = (taskVar: ReactiveVar<boolean>) => {
  // const createNewTaskId = allTasks =>
  //   allTasks.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
  // const createNewTask = (content, allTasks) => {
  //   return { content, id: createNewTaskId(allTasks) };
  // };
  // return content => {
  //   const allTasks = taskVar();
  //   taskVar(allTasks.concat([createNewTask(content, allTasks)]));
  // };

  return {};
};

export default createAddTask;
