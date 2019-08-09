import styled from 'styled-components';

import { SignIn } from '../SignIn/SignIn.style';
import { SignUp } from '../SignUp/SignUp.style';

export const signOn = styled.div`
  background-color: ${props => props.theme.color.blue};
  display: grid;
  grid-template-areas:
    'logo'
    'signIn'
    'hr'
    'signUp';
  grid-template-columns: auto;
  grid-template-rows: auto auto 10px auto;
  min-height: 100vh;
  place-items: center center;

  ${SignIn} {
    grid-area: signIn;
  }

  ${SignUp} {
    grid-area: signUp;
  }

  > hr {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
    border: 0;
    grid-area: hr;
    height: 2px;
    width: 300px;
  }

  @media screen and (min-width: 900px) {
    grid-template-areas:
      'logo logo logo'
      'signIn hr signUp';
    grid-template-columns: auto 2px auto;
    grid-template-rows: auto;

    ${SignIn} {
      align-self: start;
    }

    ${SignUp} {
      align-self: start;
    }

    > hr {
      align-self: start;
      position: relative;
      right: 150px;
      top: 150px;
      transform: rotate(90deg);
    }
  }
`;

export const logo = styled.header`
  display: flex;
  grid-area: logo;

  > h1 {
    color: ${props => props.theme.color.yellow_bright};
    font-family: 'Play', sans-serif;
    font-size: 3rem;
    letter-spacing: 0.2rem;
    margin: 0;
    text-shadow: 1px 1px ${props => props.theme.color.black};
  }

  > img {
    height: 4rem;
  }
`;
