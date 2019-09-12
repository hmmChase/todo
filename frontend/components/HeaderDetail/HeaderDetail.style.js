import styled from 'styled-components';

import { SignOutBtn } from '../SignOutBtn/SignOutBtn.style';

export const HeaderDetail = styled.div`
  align-items: center;
  display: grid;
  grid-template-areas: 'left right';
  justify-items: center;
  grid-template-columns: 1fr auto;

  > ${SignOutBtn} {
    grid-area: right;
    margin-right: 20px;
  }

  @media screen and (min-width: 920px) {
    > ${SignOutBtn} {
      margin-right: 0;
    }
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.color.yellow_bright};
  justify-self: flex-start;
  margin: 0 0 0 80px;
  font-family: 'Play', sans-serif;
  grid-area: left;
  letter-spacing: 0.05rem;
  text-shadow: 1px 1px 1px ${props => props.theme.color.black};
`;
