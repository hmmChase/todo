import styled from 'styled-components';
import { title } from '../../../constants';
import { Title } from '../../atoms/HeaderTitle/HeaderTitle.style';

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

  /* display: flex; */
  /* flex-direction: column; */

  /* flex-grow: 1; */
  /* padding: 10px; */
  /* justify-content: space-between; */
  /* align-items: center; */

  /* @media screen and (min-width: 920px) {
    padding: 10px 0;
  } */
`;

export const HeaderTitle = styled(Title)`
  padding-left: ${props => props.children === title && '70px'};
`;

export const Bottom = styled.div`
  grid-area: bottom;

  padding-bottom: ${props => !props.children && '10px'};
`;

// export const HeaderTitle = styled(Title)`
//   /* @media screen and (min-width: 420px) {
//     margin-left: 70px;
//   } */
// `;

//topmain

// h1 {
//   margin: 5px 0 5px 80px;
// }

// > ${SignOutBtn} {
//   grid-area: top-right;
//   /* margin-right: 10px; */
// }

// > ${IdeaCardForm} {
//   grid-area: bottom;
// }

// @media screen and (min-width: 920px) {
//   > ${SignOutBtn} {
//     /* margin-right: 0; */
//   }
// }
// `;

// export const TopDetail = styled.div`
//   /* display: flex;
//   flex-grow: 1;
//   padding: 10px;
//   justify-content: space-between;
//   align-items: center; */

//   background-color: ${props => props.theme.color.lightBlue};
//   border-bottom: 1px solid ${props => props.theme.color.black};
//   padding: 10px;

//   display: grid;
//   grid-template-areas: 'top-left top-right';
//   grid-template-columns: 1fr auto;
//   align-items: center;
//   flex-grow: 1;

//   @media screen and (min-width: 920px) {
//     padding: 10px 0;
//   }
// `;

// export const HeaderTitle = styled(Title)`
//   /* @media screen and (min-width: 420px) {
//     margin-left: 70px;
//   } */
// `;

/* > h1 {
    margin: 5px 0 5px 80px;
  } */

/* > ${SignOutBtn} {
    grid-area: top-right;
    margin-right: 10px;
  } */

/* > ${IdeaCardForm} {
    grid-area: bottom;
  } */

/* @media screen and (min-width: 920px) {
    > ${SignOutBtn} {
      margin-right: 0;
    }
  } */

//   h1 {
//     font-family: 'Play', sans-serif;
//     letter-spacing: 0.05rem;
//   }
// `;
