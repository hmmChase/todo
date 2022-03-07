import { FC, ReactElement } from 'react';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import Loader from '../OTHER/Loader';
import DisplayStatus from './DisplayStatus';
import graphQLErrors from '../../utils/graphQLErrors';

// Conditionally renders Apollo hook states

interface Props {
  loading: boolean;
  error?: ApolloError;
  data?: string | number | object | [];
  children: ReactElement;
  loader?: boolean;
}

const QueryResult: FC<Props> = props => {
  const { loading, error, data, children, loader } = props;

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Center>
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      </Center>
    );

  if (!data)
    return (
      <Center>
        <DisplayStatus status='info'>Nothing here</DisplayStatus>
      </Center>
    );

  if (data) return children;

  return <DisplayStatus status='error'>ERROR</DisplayStatus>;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
