import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Left from '../../DESIGN/icons/Left';

const HeaderLoggedIn = () => {
  const router = useRouter();

  const routePathArr = router.asPath.split('/');

  const isActive = path => routePathArr[1] === path;

  return (
    <UL>
      <li>
        <Link href='/account'>
          <Option>
            <Right data-active={isActive('account')} />

            <a data-active={isActive('account')}>Settings</a>
          </Option>
        </Link>
      </li>

      <li>
        <Link href='/logout'>
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
      border-bottom: 1px solid #e5e5e5;
    }

    > span {
      font-size: 0.9rem;

      :hover {
        color: ${props => props.theme.colors.text.primaryText};
      }
    }

    > a {
      color: inherit;
      text-decoration: none;

      > span {
        font-size: 0.9rem;

        :hover {
          color: ${props => props.theme.colors.text.primaryText};
        }
      }
    }
  }
`;

export const Option = styled.div`
  display: flex;
`;

const Right = styled(Left)`
  fill: #fff;
  height: 1rem;
  margin-right: 8px;
  transform: rotate(180deg);
  display: ${props => (props['data-active'] ? 'inline' : 'none')};
`;
