export interface User {
  __typename?: string;
  createdAt?: Date;
  email?: string;
  id: string;
  ideas?: Idea[];
  role: string;
}

export type Users = User[];

export interface Idea {
  __typename?: string;
  author?: User;
  content: string;
  createdAt: Date;
  id: string;
}

export type Ideas = Idea[];
