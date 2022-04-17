import { FC, ReactNode } from 'react';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import displayMessages from '../../constants/displayMessages';
import DisplayStatus from './DisplayStatus';
import errorMessages from '../../utils/errorMessages';
import Loader from '../OTHER/Loader';

interface Props {
  children: ReactNode;
  data?: number | object | string | [];
  error?: ApolloError;
  loading: boolean;
}

const QueryResult: FC<Props> = ({ children, data, error, loading }) => {
  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Center>
        <DisplayStatus status='error'>{errorMessages(error)}</DisplayStatus>
      </Center>
    );

  if (!data)
    return (
      <Center>
        <DisplayStatus status='info'>{displayMessages.empty}</DisplayStatus>
      </Center>
    );

  if (data) return <>{children}</>;

  return null;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
