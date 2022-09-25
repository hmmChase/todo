import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
  status: 'error' | 'info' | 'success';
}

const Status: FC<Props> = ({ children, status }) => {
  if (typeof children === 'string')
    return (
      <Span data-testid='statusMsg' $status={status}>
        {children}
      </Span>
    );

  return null;
};

export default Status;

interface SpanProps {
  $status: 'error' | 'info' | 'success';
}

const Span = styled.span<SpanProps>`
  background-color: ${props => {
    switch (props.$status) {
      case 'error':
        return props.theme.background.septenary;
      case 'info':
        return props.theme.background.honeyDew;
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
