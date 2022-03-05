// https://github.com/vercel/next.js/tree/canary/examples/active-class-name

import PropTypes from 'prop-types';
import { Children, cloneElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = () => (
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

const ActiveLink = props => {
  const { children, activeClassName, href, as } = props;

  const { asPath } = useRouter();

  const child = Children.only(children);

  const childClassName = child.props.className || '';

  const className =
    asPath === href || asPath === as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {cloneElement(child, { className: className || null })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.element.isRequired,
  href: PropTypes.string
};

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
