import type { ReactNode } from 'react';
import { ApolloError } from '@apollo/client';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loader from '../OTHER/Loader';
import DisplayStatus from './DisplayStatus';

// Conditionally renders Apollo hook states

interface Props {
  loading?: boolean;
  error?: ApolloError;
  data?: any;
  children?: ReactNode;
}

const QueryResult = (props: Props) => {
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

QueryResult.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.any,
  error: PropTypes.object,
  loading: PropTypes.bool
};

export default QueryResult;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
