import styled from 'styled-components';

export const linkBtn = styled.a`
  border-radius: 3px;
  border: 2px solid;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.3rem;
  text-shadow: 1px 1px 0 #000;
  transition: background-color 0.3s ease-out;
  white-space: nowrap;

  &:active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3) inset;
  }

  @media screen and (min-width: 600px) {
    padding: 0.3rem 0.6rem;
  }
`;

export const purpleLinkBtn = styled(linkBtn)`
  border-color: ${props => props.theme.color.purple};

  &:hover {
    background-color: ${props => props.theme.color.purple};
  }
`;

export const orangeLinkBtn = styled(linkBtn)`
  border-color: ${props => props.theme.color.orange};

  &:hover {
    background-color: ${props => props.theme.color.orange};
  }
`;

export const inputBtn = styled.input`
  background: none;
  border-radius: 3px;
  border: 2px solid;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  text-decoration: none;
  text-shadow: 1px 1px 0 #fff;
  transition: background-color 0.3s ease-out;
  white-space: nowrap;

  &:active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) inset;
  }

  &:hover {
    background-color: #eee;
  }
`;

export const greenInputBtn = styled(inputBtn)`
  color: ${props => props.theme.color.green};
`;

export const submitInputBtn = styled(inputBtn)`
  color: ${props => !props.disabled && props.theme.color.green};
`;
