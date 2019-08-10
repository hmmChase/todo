import styled from 'styled-components';

export const linkBtn = styled.a`
  border-radius: 4px;
  border: 2px solid;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  text-shadow: 1px 1px 1px ${props => props.theme.color.black};
  transition: background-color 0.2s ease-out;
  white-space: nowrap;

  &:active {
    box-shadow: 0 2px 6px rgba(255, 255, 255, 0.5) inset;
  }
`;

export const purpleLinkBtn = styled(linkBtn)`
  border-color: ${props => props.theme.color.purple};

  &:hover {
    background-color: ${props => props.theme.color.purple};
  }
`;
