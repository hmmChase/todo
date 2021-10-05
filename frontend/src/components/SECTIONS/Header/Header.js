import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

import HeaderLoggedOut from './HeaderLoggedOut';
// import HeaderUsername from './HeaderUsername';
import AddIdea from '../../IDEA/AddIdea';
import IconUser from '../../OTHER/IconUser';
import { siteTitle } from '../../../config';
import Ideabox from '../../../../public/images/ideabox.png';
import NavBar from '../NavBar';

const Header = props => {
  const { isLoggedIn } = props;

  const router = useRouter();

  const routePathArr = router.asPath.split('/');

  const onIdeaDetailPage = routePathArr[1] === 'idea';

  const ideaId = routePathArr[2];

  return (
    <Container>
      <Top>
        <Logo>
          <BoxImg src={Ideabox} alt='ideabox' />

          <HeaderTitle>{siteTitle}</HeaderTitle>
        </Logo>

        {/* <NavBar /> */}

        {/* {isLoggedIn && <HeaderUsername />} */}

        {isLoggedIn ? <IconUser /> : <HeaderLoggedOut />}
      </Top>

      <Bottom>
        {onIdeaDetailPage ? <IdeaTitle>{ideaId}</IdeaTitle> : <AddIdea />}
      </Bottom>
    </Container>
  );
};

export default Header;

// const HeaderContainer = styled.header(props => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignSelf: 'center',
//   width: '100%',
//   maxWidth: props.theme.widths.largePageWidth,
//   // 60 below removes 3 * 20 horizontal paddings (sides and inner between player and list)
//   height: ((props.totalWidth - 60) * (2 / 3)) / (16 / 9),
//   maxHeight: (props.theme.widths.largePageWidth * (2 / 3)) / (16 / 9),
//   ':hover': {
//     backgroundColor: props.theme.colors.grey
//   },

//   [mq[0]]: {
//     width: '90%'
//   },

//   [mq[1]]: {
//     width: '47%'
//   },

//   [mq[2]]: {
//     width: '31%'
//   }
// }));

const Container = styled.div`
  display: flex;
  flex-direction: column;

  /* display: grid; */
  /* grid-gap: 0.5rem; */
  /* grid-template-areas: */
  /* 'top' */
  /* 'bottom'; */
  /* grid-template-columns: auto 1fr auto; */
  /* align-items: center; */
  /* justify-items: center; */
  /* width: 100%; */
  /* position: relative; */
  /* padding-top: 1rem; */
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const BoxImg = styled(Image).attrs({
  layout: 'fixed',
  width: 50,
  height: 41
})``;

const IdeaTitle = styled.h2`
  margin: 0 0 1rem 1rem;
`;

const HeaderTitle = styled.h1`
  /* font-size: calc(16px + 6 * ((100vw - 320px) / 680)); */
  font-size: min(max(16px, 4vw), 22px);
  margin: 0;
  font-family: 'Play', sans-serif;
  letter-spacing: 0.05rem;
  display: inline;
`;

const Bottom = styled.div``;
