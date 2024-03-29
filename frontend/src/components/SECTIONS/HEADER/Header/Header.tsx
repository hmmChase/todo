import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
// import { useContext } from 'react';

import { siteTitle } from '@/constants/config';
import TaskButton from '@/components/TASK/TaskButton/TaskButton';
// import { useUser } from '@/context/User';
// import HeaderUsername from '@/components/SECTIONS/HEADER/HeaderUsername';
// import NavBar from '@/components/SECTIONS/NavBar';
// import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
// import Taskbox from '@/public/images/taskbox.svg';
// import UserIcon from '@/components/USER/UserIcon/UserIcon';

const Header = () => {
  // const { loading, user } = useUser();

  const router = useRouter();

  const routePathArr = router.asPath.split('/');

  const onTaskDetailPage = routePathArr[1] === 'task';

  const taskId = routePathArr[2];

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  return (
    <Container>
      <Top>
        <Logo>
          {/* <BoxImg alt='ideabox' priority src={Ideabox} /> */}

          <HeaderTitle>{siteTitle}</HeaderTitle>
        </Logo>

        {/* <NavBar /> */}

        {/* {user && <HeaderUsername />} */}

        {/* <QueryResult
          error={error}
          loading={loading}
          showError={true}
          showLoading={true}
        > */}

        {today.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}

        {/* {!loading ? user && <UserIcon /> : null} */}

        {/* </QueryResult> */}
      </Top>

      <TaskButton />

      {/* <div>
        {onTaskDetailPage ? (
          <TaskTitle>{taskId}</TaskTitle>
        ) : (
          user && <CreateTask />
        )}
      </div> */}
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

const BoxImg = styled(Image).attrs({ height: 41, width: 50 })``;

const TaskTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.h2};
  margin: 0 0 1rem 1rem;
`;

const HeaderTitle = styled.h1`
  /* color: ${props => props.theme.text.tertiary}; */
  font-size: ${props => props.theme.fontSize.h1};
  letter-spacing: 0.05rem;
  margin: 0;
`;
