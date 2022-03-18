export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  removedAt: string;
  email: string;
  password: string;
  role: string;
  ideas: Idea[];
}

export interface Idea {
  id: string;
  content: string;
  author: User;
}

export type Ideas = Idea[];
