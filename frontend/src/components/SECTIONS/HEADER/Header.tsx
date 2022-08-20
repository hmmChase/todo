import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import { siteTitle } from '@/constants/config';
import { UserCtx } from '@/context/User';
import CreateIdea from '@/components/IDEA/CreateIdea';
import HeaderLoggedOut from '@/components/SECTIONS/HEADER/HeaderLoggedOut';
import Ideabox from '@/public/images/ideabox.png';
import QueryResult from '@/components/REUSEABLE/QueryResult';
import UserIcon from '@/components/USER/UserIcon';
// import NavBar from '@/components/SECTIONS/NavBar';
// import HeaderUsername from '@/components/SECTIONS/HEADER/HeaderUsername';

const Header: FC = () => {
  const { user } = useContext(UserCtx);

  const router = useRouter();

  const routePathArr = router.asPath.split('/');

  const onIdeaDetailPage = routePathArr[1] === 'idea';

  const ideaId = routePathArr[2];

  return (
    <Container>
      <Top>
        <Logo>
          <BoxImg alt='ideabox' priority src={Ideabox} />

          <HeaderTitle>{siteTitle}</HeaderTitle>
        </Logo>

        {/* <NavBar /> */}

        {/* {user && <HeaderUsername />} */}

        <QueryResult loading={user?.loading}>
          {user?.id ? <UserIcon /> : <HeaderLoggedOut />}
        </QueryResult>
      </Top>

      <div>
        {onIdeaDetailPage ? (
          <IdeaTitle>{ideaId}</IdeaTitle>
        ) : (
          user && <CreateIdea />
        )}
      </div>
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
`;

const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const Logo = styled.div`
  align-items: center;
  display: flex;
`;

const BoxImg = styled(Image).attrs({
  height: 41,
  layout: 'fixed',
  width: 50
})``;

const IdeaTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.h2};
  margin: 0 0 1rem 1rem;
`;

const HeaderTitle = styled.h1`
  color: ${props => props.theme.text.tertiary};
  font-size: ${props => props.theme.fontSize.h1};
  letter-spacing: 0.05rem;
  margin: 0;
`;
