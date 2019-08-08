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
  place-items: center center;
  grid-template-rows: 100px auto 10px auto;
  /* grid-auto-rows: min-content; */
  /* grid-auto-columns: min-content; */

  min-height: 100vh;

  ${SignIn} {
    grid-area: signIn;

    @media screen and (min-width: 900px) {
      align-self: start;
    }
  }

  ${SignUp} {
    grid-area: signUp;

    @media screen and (min-width: 900px) {
      align-self: start;
    }
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
    width: 400px;

    @media screen and (min-width: 900px) {
      align-self: start;
      position: relative;
      right: 150px;
      top: 150px;
      transform: rotate(90deg);
      width: 300px;
    }
  }

  @media screen and (min-width: 900px) {
    grid-template-areas:
      'logo logo logo'
      'signIn hr signUp';
    grid-template-columns: auto 2px auto;
    /* grid-template-rows: auto; */
  }
`;

export const logo = styled.header`
  display: flex;
  grid-area: logo;
  margin: 2rem 0 0 0;

  > h1 {
    color: ${props => props.theme.color.yellow_bright};
    font-family: 'Play', sans-serif;
    font-size: 3rem;
    letter-spacing: 0.1rem;
    margin: 0;
  }

  > img {
    height: 4rem;
  }
`;
