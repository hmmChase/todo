import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: string | string[];
  status: 'info' | 'loading' | 'error' | 'success';
}

const DisplayStatus: FC<Props> = props => {
  const { children, status } = props;

  if (Array.isArray(children))
    return (
      <MsgList>
        {children.map((statusMsg, i) => (
          <MsgItem key={`msg${i}`}>
            <Span data-testid='msgItem' status={status}>
              {statusMsg}
            </Span>
          </MsgItem>
        ))}
      </MsgList>
    );

  if (typeof children === 'string')
    return (
      <Span data-testid='msgItem' status={status}>
        {children}
      </Span>
    );

  return (
    <Span data-testid='msgItem' status={'error'}>
      Opps, something went wrong.
    </Span>
  );
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

const MsgList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MsgItem = styled.li`
  :not(:first-child) {
    margin-top: 10px;
  }
`;
