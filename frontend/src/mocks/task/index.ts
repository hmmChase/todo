import { admin, user1, user2 } from '@/mocks/user';
import type { Task, Tasks } from '@/models/index';

export const task1: Task = {
  __typename: 'Task',
  author: user1,
  content: 'task 1',
  createdAt: new Date(),
  due: new Date().toISOString(),
  id: '1'
};

export const task2: Task = {
  __typename: 'Task',
  author: user2,
  content: 'task 2',
  createdAt: new Date(),
  due: new Date().toISOString(),
  id: '2'
};

export const task3: Task = {
  __typename: 'Task',
  author: admin,
  content: 'task 3',
  createdAt: new Date(),
  due: new Date().toISOString(),
  id: '3'
};

export const tasks: Tasks = [task1, task2, task3];
