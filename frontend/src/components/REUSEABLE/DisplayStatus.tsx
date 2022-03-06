import { FC } from 'react';
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';

interface Props {
  children: string;
  status: 'info' | 'loading' | 'error' | 'success';
  error?: ApolloError;
}

const DisplayStatus: FC<Props> = props => {
  const { children, status, error } = props;

  if (error && error.graphQLErrors && error.graphQLErrors.length)
    return (
      <ErrorList>
        {error.graphQLErrors.map((error, i) => (
          <ErrorItem key={`error${i}`}>
            <Span data-testid='errorMessage' status={status}>
              {error.message}
            </Span>
          </ErrorItem>
        ))}
      </ErrorList>
    );

  if (error && error.message)
    return (
      <Span data-testid='errorMessage' status={status}>
        {error.message}
      </Span>
    );

  if (error)
    return (
      <Span data-testid='errorMessage' status={status}>
        Opps, something went wrong.
      </Span>
    );

  return <Span status={status}>{children}</Span>;
};

export default DisplayStatus;

const Span = styled.span`
  background-color: ${props => {
    switch (props.status) {
      case 'info':
        return props.theme.background.honeyDew;
      case 'error':
        return props.theme.background.septenary;
      case 'success':
        return props.theme.background.senary;
      default:
        return props.theme.background.secondary;
    }
  }};
  border-radius: ${props => props.theme.borderRadius.primary};
  border: 1px solid ${props => props.theme.border.secondary};
  padding: 4px;
`;

const ErrorList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ErrorItem = styled.li`
  :not(:first-child) {
    margin-top: 10px;
  }
`;
