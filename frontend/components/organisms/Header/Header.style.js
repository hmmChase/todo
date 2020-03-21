import styled from 'styled-components';
import HeaderTitle from '../../atoms/HeaderTitle/HeaderTitle';
import { title } from '../../../constants';

export const Header = styled.div`
  display: grid;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  grid-template-columns: 1fr auto;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => props.theme.color.lightBlue};
  border-bottom: 1px solid ${props => props.theme.color.black};
  padding: 10px 10px 0 10px;
`;

export const TitleHeader = styled(HeaderTitle)`
  padding-left: ${props => props.children === title && '70px'};
`;

export const Bottom = styled.div`
  grid-area: bottom;
  padding-bottom: ${props => !props.children && '10px'};
`;
