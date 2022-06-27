export interface User {
  id: string;
  email: string;
  role: string;
  ideas?: Idea[];
}

export interface Idea {
  id: string;
  createdAt: string;
  content: string;
  author?: User;
}

export type Ideas = Idea[];
