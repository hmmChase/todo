import styled from 'styled-components';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

export const SignOn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.lightBlue};
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15rem;
  width: 80%;
  max-width: 20rem;
  flex-grow: 0;

  @media screen and (min-width: 800px) {
    position: relative;
    flex-direction: row;
    justify-content: space-around;
    max-width: 900px;
  }
`;

export const SignInn = styled(SignIn)`
  /* width: 100%; */

  @media screen and (min-width: 800px) {
    width: 40%;
  }
`;

export const SignUpp = styled(SignUp)`
  /* width: 100%; */

  @media screen and (min-width: 800px) {
    width: 40%;
  }
`;

export const Img = styled.img`
  height: 4rem;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.color.darkRed};
  font-family: 'Play', sans-serif;
  font-size: 3rem;
  letter-spacing: 0.2rem;
  margin: 0;
`;

export const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 0.2rem;
  margin: 2rem 0;

  @media screen and (min-width: 800px) {
    width: 20rem;
    position: absolute;
    top: 160px;
    transform: rotate(90deg);
  }
`;
