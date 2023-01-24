import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: string[] | string;
  type: 'error' | 'info' | 'success';
}

const Notice: FC<Props> = ({ children, type }) => {
  if (Array.isArray(children)) {
    return (
      <MsgList>
        {children.map((msg, i) => (
          <MsgItem key={i} $type={type}>
            {msg}
          </MsgItem>
        ))}
      </MsgList>
    );
  }

  return <MsgItem $type={type}>{children}</MsgItem>;
};

export default Notice;

interface SpanProps {
  $type: 'error' | 'info' | 'success';
}

const MsgList = styled.ul`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
`;

const MsgItem = styled.li<SpanProps>`
  background-color: ${props => {
    switch (props.$type) {
      case 'error':
        return props.theme.background.septenary;
      case 'info':
        return props.theme.background.nonary;
      case 'success':
        return props.theme.background.octonary;
    }
  }};
  border-radius: ${props => props.theme.borderRadius.primary};
  border: 1px solid ${props => props.theme.border.secondary};
  display: inline-block;
  padding: 4px;
`;
