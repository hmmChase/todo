import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const HeaderLoggedIn = () => {
  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  return (
    <UL>
      <li>
        <Link href='/account'>
          <a data-active={isActive('/account')}>Settings</a>
        </Link>
      </li>

      <li>
        <Link href='/logout'>
          <a data-active={isActive('/logout')}>Log out</a>
        </Link>
      </li>

      <style jsx>{`
        a[data-active='true'] {
          color: red;
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
