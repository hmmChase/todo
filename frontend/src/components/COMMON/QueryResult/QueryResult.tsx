import { FC, ReactNode } from 'react';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

import Loading from '@/components/COMMON/Loading/Loading';
import Notice from '@/components/COMMON/Notice/Notice';
import parseGQLerrors from '@/utils/parseGQLerrors';

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
    return <Notice type='error'>{parseGQLerrors(error)}</Notice>;

  return <>{children}</>;
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
