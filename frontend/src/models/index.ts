export interface User {
  __typename?: string;
  createdAt: Date;
  email: string;
  id: string;
  role: string;
  tasks?: Task[];
}

export type Users = User[];

export interface Task {
  __typename?: string;
  author: User;
  content: string;
  createdAt: Date;
  dueBy: Date;
  id: string;
  removedAt?: Date;
}

export type Tasks = Task[];
