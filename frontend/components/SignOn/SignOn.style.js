import styled from 'styled-components';
import { Layout } from 'antd';

import { SignIn } from '../SignIn/SignIn.style';
import { SignUp } from '../SignUp/SignUp.style';

export const SignOn = styled(Layout)`
  display: flex;
  background-color: ${props => props.theme.color.blue};
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Header = styled(Layout.Header)`
  display: flex;
  padding: 20px;
`;

export const Content = styled(Layout.Content)`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-grow: 0;

  @media screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    max-width: 900px;

    > ${SignIn} {
      width: 40%;
    }

    > ${SignUp} {
      width: 40%;
    }
  }
`;

export const Img = styled.img`
  height: 4rem;
`;

export const Title = styled.h1`
  color: ${props => props.theme.color.yellow_bright};
  font-family: 'Play', sans-serif;
  font-size: 3rem;
  letter-spacing: 0.2rem;
  margin: 0;
  text-shadow: 1px 1px ${props => props.theme.color.black};
`;

export const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 2px;
  width: 300px;

  @media screen and (min-width: 900px) {
    position: absolute;
    top: 150px;
    transform: rotate(90deg);
  }
`;
