import { FC, ReactNode, ReactElement } from 'react';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import displayMessages from '../../constants/displayMessages';
import Error from './Error';
import Loading from './Loading';
import Status from './Status';

interface Props {
  children: ReactNode;
  data: any;
  error?: ApolloError;
  loader?: boolean | ReactElement;
  loading: boolean | undefined;
}

const QueryResult: FC<Props> = ({ children, data, error, loader, loading }) => {
  // Uncomment to test loading state
  // loading = true;

  if (loading) return <Loading loader={loader} />;

  if (error) return <Error error={error} />;

  // If data is an empty array, display empty message
  if (!error && !loading && data && Array.isArray(data) && data.length === 0)
    return (
      <Center>
        <Status status='info'>{displayMessages.empty}</Status>
      </Center>
    );

  if (!error && !loading && data) return <>{children}</>;

  return null;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
