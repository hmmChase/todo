import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = () => {
  const router = useRouter();

  const routePathArr = router.asPath.split('/');

  const isActive = path => routePathArr[1] === path;

  return (
    <nav>
      <MenuList>
        <li>
          <Link href='/'>
            <a data-active={isActive('')}>Home</a>
          </Link>
        </li>

        <li>
          <Link href='/offset'>
            <a data-active={isActive('offset')}>Offset</a>
          </Link>
        </li>

        <li>
          <Link href='/curser'>
            <a data-active={isActive('curser')}>Curser</a>
          </Link>
        </li>

        <li>
          <Link href='/ssr'>
            <a data-active={isActive('ssr')}>SSR</a>
          </Link>
        </li>

        <li>
          <Link href='/ssg'>
            <a data-active={isActive('ssg')}>SSG</a>
          </Link>
        </li>
      </MenuList>
    </nav>
  );
};

export default NavBar;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  > li a[data-active='true'] {
    color: ${props => props.theme.text.tertiary};
  }
`;
