export interface User {
  __typename?: string;
  createdAt: Date;
  email: string;
  id: string;
  tasks?: Task[];
  role: string;
}

export type Users = User[];

export interface Task {
  __typename?: string;
  author: User;
  content: string;
  createdAt: Date;
  id: string;
}

export type Tasks = Task[];
