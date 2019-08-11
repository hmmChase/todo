import styled from 'styled-components';

import { signOutBtn } from '../SignOut/SignOut.style';

export const header = styled.header`
  background-color: ${props => props.theme.color.blue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  display: grid;
  grid-area: header;
  grid-gap: 10px;
  grid-template-areas: 'header-left header-right';
  padding: 10px 0 0 0;
  place-items: center center;

  > h1 {
    color: ${props => props.theme.color.yellow_bright};
    font-family: 'Play', sans-serif;
    font-size: 1.5rem;
    justify-self: start;
    letter-spacing: 0.05rem;
    margin: 0 0 0 65px;
    text-shadow: 1px 1px ${props => props.theme.color.black};
  }

  > ${signOutBtn} {
    justify-self: end;
    margin-right: 10px;
  }

  @media screen and (min-width: 600px) {
    padding: 10px 20px 0 20px;

    > h1 {
      margin-left: 70px;
    }

    > ${signOutBtn} {
      margin-right: 0;
    }
  }
`;
