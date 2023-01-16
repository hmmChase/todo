export interface User {
  __typename?: string;
  id: string;
  email: string;
  role: string;
  ideas?: Idea[];
}

export type Users = User[];

export interface Idea {
  __typename?: string;
  id: string;
  createdAt: string;
  content: string;
  author?: { id: User['id'] };
}

export type Ideas = Idea[];
