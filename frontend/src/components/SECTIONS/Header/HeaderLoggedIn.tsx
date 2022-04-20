import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import Left from '../../DESIGN/icons/Left';

const HeaderLoggedIn: FC = () => {
  const router = useRouter();

  const routePathArr = router.asPath.split('/');

  const isActive = (path: string) => routePathArr[1] === path;

  return (
    <UL>
      <li>
        <Link href='/account' passHref prefetch={false}>
          <Option>
            <Right data-active={isActive('account')} />

            <a data-active={isActive('account')}>Account</a>
          </Option>
        </Link>
      </li>

      <li>
        <Link href='/logout' prefetch={false}>
          <a data-active={isActive('logout')}>Log out</a>
        </Link>
      </li>

      <style jsx>{`
        a[data-active='true'] {
          color: lightblue;
        }
      `}</style>
    </UL>
  );
};

export default HeaderLoggedIn;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;

  > li {
    cursor: pointer;
    padding: 10px 0;
    :not(:last-child) {
      border-bottom: 1px solid ${props => props.theme.border.secondary};
    }

    > a {
      color: ${props => props.theme.text.secondary};
      text-decoration: none;
    }
  }
`;

export const Option = styled.div`
  align-items: center;
  display: flex;
`;

const Right = styled(Left)`
  fill: ${props => props.theme.fill.primary};
  height: 0.8rem;
  margin-right: 8px;
  transform: rotate(180deg);
`;
