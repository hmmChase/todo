// https://github.com/vercel/next.js/tree/canary/examples/active-class-name

import { Children, cloneElement, FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';

interface Props {
  activeClassName?: string;
  as?: string;
  children: ReactElement;
  href: LinkProps['href'];
}

const ActiveLink: FC<Props> = ({ activeClassName, as, children, href }) => {
  const { asPath } = useRouter();

  const child = Children.only(children);

  const childClassName = child.props.className || '';

  const className =
    asPath === href || asPath === as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href}>
      {cloneElement(child, { className: className || null })}
    </Link>
  );
};

const NavBar: FC = () => (
  <nav>
    <UL>
      <li>
        <ActiveLink href='/' activeClassName='active'>
          <A>Home</A>
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/offset' activeClassName='active'>
          <A>Offset</A>
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/curser' activeClassName='active'>
          <A>Curser</A>
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/ssr' activeClassName='active'>
          <A>SSR</A>
        </ActiveLink>
      </li>

      <li>
        <ActiveLink href='/ssg' activeClassName='active'>
          <A>SSG</A>
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
`;

export const A = styled.a`
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;
