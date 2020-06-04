import styled from 'styled-components';
import { title } from '../../../config';
import HeaderTitle from '../../atoms/HeaderTitle/HeaderTitle';
import SignOutBtn from '../../molecules/SignOutBtn/SignOutBtn';

export const Header = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  grid-template-columns: 1fr auto;
  align-items: center;
  flex-grow: 1;
`;

export const HeaderTitlee = styled(HeaderTitle)`
  padding-left: ${(props) => props.children === title && '70px'};
`;

export const SignOutBtnn = styled(SignOutBtn)`
  margin-right: 10px;
  width: 88px;

  @media screen and (min-width: 910px) {
    margin: 0;
  }
`;

export const Welcome = styled.span`
  margin-right: 10px;
`;

export const Bottom = styled.div`
  grid-area: bottom;
  padding-bottom: ${(props) => !props.children && '10px'};
`;
