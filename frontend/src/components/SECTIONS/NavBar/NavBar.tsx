// not used

import ActiveLink from '@/components/COMMON/ActiveLink/ActiveLink';
import styled from 'styled-components';
import type { FC } from 'react';

const NavBar: FC = () => (
  <nav>
    <UL>
      <li>
        <ActiveLink href='/' activeClassName='active'>
          Home
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/offset' activeClassName='active'>
          Offset
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/cursor' activeClassName='active'>
          Cursor
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/ssr' activeClassName='active'>
          SSR
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/ssg' activeClassName='active'>
          SSG
        </ActiveLink>
      </li>
    </UL>
  </nav>
);

export default NavBar;

const UL = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  .active {
    color: ${props => props.theme.text.tertiary};
  }

  > a {
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }
`;
