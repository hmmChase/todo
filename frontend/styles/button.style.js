import styled from 'styled-components';

export const aBtn = styled.a`
  text-decoration: none;
  text-shadow: 1px 1px 0 #fff;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #eee;
  }

  &:active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) inset;
  }
`;

export const purpleBtn = styled(aBtn)`
  color: ${props => props.theme.purple};
  border-color: ${props => props.theme.purple};
`;

export const orangeBtn = styled(aBtn)`
  color: ${props => props.theme.orange};
  border-color: ${props => props.theme.orange};
`;

export const greenBtn = styled(aBtn)`
  color: ${props => props.theme.green};
  border-color: ${props => props.theme.green};
`;

export const redBtn = styled(aBtn)`
  color: ${props => props.theme.red};
  border-color: ${props => props.theme.red};
`;
