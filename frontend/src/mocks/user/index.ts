import type { User, Users } from '@/models/index';

export const admin: User = {
  __typename: 'User',
  createdAt: new Date(),
  email: 'admin@email.com',
  id: '1',
  // tasks: [],
  role: 'ADMIN'
};

export const user1: User = {
  __typename: 'User',
  createdAt: new Date(),
  email: 'user1@email.com',
  id: '2',
  // tasks: [],
  role: 'USER'
};

export const user2: User = {
  __typename: 'User',
  createdAt: new Date(),
  email: 'user2@email.com',
  id: '3',
  // tasks: [],
  role: 'USER'
};

export const users: Users = [admin, user1, user2];
