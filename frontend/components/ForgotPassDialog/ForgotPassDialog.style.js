import styled from 'styled-components';

export const signOn = styled.div`
  grid-area: header-right;
  justify-self: end;
  margin-right: 10px;
  white-space: nowrap;

  @media screen and (min-width: 600px) {
    margin-right: 0;
  }
`;

export const aForgotPass = styled.a`
  cursor: pointer;
`;
