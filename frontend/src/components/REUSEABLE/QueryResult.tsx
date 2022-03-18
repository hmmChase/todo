import { FC, ReactNode } from 'react';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import DisplayStatus from './DisplayStatus';
import graphQLErrors from '../../utils/graphQLErrors';
import Loader from '../OTHER/Loader';

interface Props {
  children: ReactNode;
  data?: string | number | object | [];
  error?: ApolloError;
  loading: boolean;
}

const QueryResult: FC<Props> = ({ children, data, error, loading }) => {
  if (error)
    return (
      <Center>
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      </Center>
    );

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (!data)
    return (
      <Center>
        <DisplayStatus status='info'>Nothing to show</DisplayStatus>
      </Center>
    );

  if (data) return <>{children}</>;

  return <DisplayStatus status='error'>ERROR</DisplayStatus>;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
