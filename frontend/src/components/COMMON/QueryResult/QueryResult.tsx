import { ApolloError } from '@apollo/client';
import Loading from '@/components/COMMON/Loading/Loading';
import Notice from '@/components/COMMON/Notice/Notice';
import parseGQLErrors from '@/utils/parseGQLErrors';
import styled from 'styled-components';
import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  error: ApolloError | undefined;
  loading: boolean;
  showError?: boolean;
  showLoading?: boolean;
}

const QueryResult: FC<Props> = ({
  children,
  error,
  loading,
  showError,
  showLoading
}) => {
  if (loading && showLoading) return <Loading />;

  if (error && showError)
    return <Notice type='error'>{parseGQLErrors(error)}</Notice>;

  return <>{children}</>;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;