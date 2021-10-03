// import styled from 'styled-components';

// import { title } from '../../../config';
// import SignIn from '../SignIn/SignIn';
// import ForgotPassDialog from '../../molecules/ForgotPassDialog/ForgotPassDialog';
// import SignUp from '../SignUp/SignUp';

// const SignOn = () => (
//   <SignOn>
//     <Header>
//       <Img src='images/ideabox.png' alt='ideabox' />

//       <Title>{title}</Title>
//     </Header>

//     <Content>
//       <ContentHalf>
//         <SignIn />

//         <ForgotPassDialog />
//       </ContentHalf>

//       <HR />

//       <ContentHalf>
//         <SignUp />
//       </ContentHalf>
//     </Content>
//   </SignOn>
// );

// export default SignOn;

// const SignOn = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: ${props => props.theme.color.lightBlue};
//   min-height: 100vh;
//   justify-content: center;
//   align-items: center;
//   padding-bottom: 20px;
// `;

// const Header = styled.header`
//   display: flex;
//   align-items: center;
//   padding: 20px;
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-width: 15rem;
//   width: 80%;
//   max-width: 20rem;
//   flex-grow: 0;

//   @media screen and (min-width: 800px) {
//     position: relative;
//     flex-direction: row;
//     justify-content: space-around;
//     max-width: 900px;
//   }
// `;

// const ContentHalf = styled.div`
//   @media screen and (min-width: 800px) {
//     width: 40%;
//   }
// `;

// const Img = styled.img`
//   height: 4rem;
// `;

// const Title = styled.h1`
//   color: ${props => props.theme.color.darkRed};
//   font-family: 'Play', sans-serif;
//   font-size: 3rem;
//   letter-spacing: 0.2rem;
//   margin: 0;
// `;

// const HR = styled.hr`
//   background-image: linear-gradient(
//     to right,
//     rgba(0, 0, 0, 0),
//     rgba(0, 0, 0, 0.75),
//     rgba(0, 0, 0, 0)
//   );
//   border: 0;
//   height: 0.2rem;
//   margin: 2rem 0;

//   @media screen and (min-width: 800px) {
//     width: 20rem;
//     position: absolute;
//     top: 160px;
//     transform: rotate(90deg);
//   }
// `;
