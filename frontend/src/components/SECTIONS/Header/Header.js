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
      <Logo>
        <BoxImg src={Ideabox} alt='ideabox' />

        <HeaderTitle>{siteTitle}</HeaderTitle>
      </Logo>

      <NavBar />

      {isLoggedIn ? <IconUser /> : <HeaderLoggedOut />}

      {/* {isLoggedIn && <HeaderUsername />} */}

      {onIdeaDetailPage ? (
        <h2>{ideaId}</h2>
      ) : (
        <Bottom>
          <AddIdea />
        </Bottom>
      )}
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
  display: grid;
  grid-gap: 0.5rem;
  grid-template-areas:
    'top-left top-middle top-right'
    'bottom bottom bottom';
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-items: center;
  width: 100%;
  position: relative;
  padding-top: 1rem;
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

const HeaderTitle = styled.h1`
  /* font-size: calc(16px + 6 * ((100vw - 320px) / 680)); */
  font-size: min(max(16px, 4vw), 22px);
  margin: 0;
  font-family: 'Play', sans-serif;
  letter-spacing: 0.05rem;
  display: inline;
`;

const Bottom = styled.div`
  grid-area: bottom;
  width: 100%;
`;
