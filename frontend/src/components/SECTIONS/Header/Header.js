import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import HeaderLoggedOut from './HeaderLoggedOut';
// import HeaderUsername from './HeaderUsername';
import AddIdea from '../../IDEA/AddIdea';
import IconUser from '../../OTHER/IconUser';
import { siteTitle } from '../../../config';

const Header = props => {
  const { isLoggedIn, onIdeaPage } = props;

  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  const slug = router.asPath.split('/')[2];

  return (
    <HeaderContainer>
      <HeaderTitle
        aria-label={props['aria-label']}
        data-testid={props['data-testid']}
        className={props.className}
      >
        {siteTitle}
      </HeaderTitle>

      <nav>
        {/* {isLoggedIn && <HeaderUsername />} */}

        <MenuList>
          <li>
            <Link href='/'>
              <a data-active={isActive('/')}>Home</a>
            </Link>
          </li>

          <li>
            <Link href='/offset'>
              <a data-active={isActive('/offset')}>Offset</a>
            </Link>
          </li>

          <li>
            <Link href='/curser'>
              <a data-active={isActive('/curser')}>Curser</a>
            </Link>
          </li>

          <li>
            <Link href='/ssr'>
              <a data-active={isActive('/ssr')}>SSR</a>
            </Link>
          </li>

          <li>
            <Link href='/ssg'>
              <a data-active={isActive('/ssg')}>SSG</a>
            </Link>
          </li>
        </MenuList>
      </nav>

      {isLoggedIn ? <IconUser /> : <HeaderLoggedOut />}

      {onIdeaPage ? (
        <h2>{slug}</h2>
      ) : (
        <Bottom>
          <AddIdea />
        </Bottom>
      )}

      <style jsx>{`
        a[data-active='true'] {
          color: red;
        }
      `}</style>
    </HeaderContainer>
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

const HeaderContainer = styled.header`
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'top-left top-middle top-right'
    'bottom bottom bottom';
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  flex-grow: 1;

  background-color: lightgray;
`;

const HeaderTitle = styled.h1`
  /* font-size: calc(16px + 6 * ((100vw - 320px) / 680)); */
  font-size: min(max(16px, 4vw), 22px);
  margin: 0;

  padding-left: ${props => (props.children === siteTitle ? '70px' : '10px')};

  background-color: lightgreen;
`;

const MenuList = styled.ul`
  list-style: none;
  margin-left: auto;
  margin-right: auto;

  > li {
    display: inline;
  }

  background-color: lightblue;
`;

const li = styled.li`
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

//  const SignOutBtnn = styled(SignOutBtn)`
//   margin-right: 10px;
//   width: 88px;

//   @media screen and (min-width: 910px) {
//     margin-right: 0;
//   }
// `;

//  const Welcome = styled.span`
//   margin-right: 10px;
// `;

const Bottom = styled.div`
  grid-area: bottom;

  background-color: lightyellow;
`;
