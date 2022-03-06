import { FC, ReactElement } from 'react';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import Loader from '../OTHER/Loader';
import DisplayStatus from './DisplayStatus';

// Conditionally renders Apollo hook states

interface Props {
  loading?: boolean;
  children: ReactElement | null;
  error?: ApolloError;
  data?: string | number | [] | object;
}

const QueryResult: FC<Props> = props => {
  const { loading, error, data, children } = props;

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Center>
        <DisplayStatus status='error' error={error} />
      </Center>
    );

  if (!data)
    return (
      <Center>
        <DisplayStatus status='info'>Nothing here</DisplayStatus>
      </Center>
    );

  if (data) return children;

  return <DisplayStatus status='error' error={{ message: 'ERROR' }} />;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
