export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Idea = {
  __typename?: 'Idea';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
};

/**
 * Simple wrapper around our list of ideas that contains a cursor to the last
 * item in the list.
 * Pass this cursor to the ideas query to fetch results after these.
 */
export type IdeaConnection = {
  __typename?: 'IdeaConnection';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  ideas: Array<Idea>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createIdea: Idea;
  deleteIdea: Idea;
  logIn: UserAuthPayload;
  logOut: Scalars['Boolean'];
  passReset: UserAuthPayload;
  passResetReq: Scalars['Boolean'];
  removeIdea: Idea;
  signUp: UserAuthPayload;
  updateIdea: Idea;
};

export type MutationCreateIdeaArgs = {
  content: Scalars['String'];
};

export type MutationDeleteIdeaArgs = {
  id: Scalars['ID'];
};

export type MutationLogInArgs = {
  input: UserAuthInput;
};

export type MutationPassResetArgs = {
  newPassword: Scalars['String'];
  resetPassToken: Scalars['String'];
};

export type MutationPassResetReqArgs = {
  email: Scalars['String'];
};

export type MutationRemoveIdeaArgs = {
  id: Scalars['ID'];
};

export type MutationSignUpArgs = {
  input: UserAuthInput;
};

export type MutationUpdateIdeaArgs = {
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  currentNumber?: Maybe<Scalars['Int']>;
  currentUser?: Maybe<User>;
  currentUserIdeas: Array<Idea>;
  idea?: Maybe<Idea>;
  ideas: Array<Idea>;
  ideasPaginatedCursor: IdeaConnection;
  ideasPaginatedOffset: Array<Idea>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryIdeaArgs = {
  id: Scalars['ID'];
};

export type QueryIdeasPaginatedCursorArgs = {
  after?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type QueryIdeasPaginatedOffsetArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Subscription = {
  __typename?: 'Subscription';
  numberIncremented?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  ideas: Array<Idea>;
  role: Role;
};

export type UserAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserAuthPayload = {
  __typename?: 'UserAuthPayload';
  user: User;
};
