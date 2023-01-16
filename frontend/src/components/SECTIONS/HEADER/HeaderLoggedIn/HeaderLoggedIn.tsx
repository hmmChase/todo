import { FC, useContext } from 'react';
import styled from 'styled-components';

import { UserCtx } from '@/context/User';
import ActiveLink from '@/components/COMMON/ActiveLink/ActiveLink';
import Left from '@/components/DESIGN/ICONS/Left/Left';

const HeaderLoggedIn: FC = () => {
  const { user } = useContext(UserCtx);

  return (
    <nav>
      <UL>
        {user?.role === 'ADMIN' && (
          <li>
            <ActiveLink activeClassName='active' href='/admin'>
              Admin
            </ActiveLink>
          </li>
        )}

        <li>
          <ActiveLink activeClassName='active' href='/account'>
            Account
          </ActiveLink>
        </li>

        <li>
          <ActiveLink activeClassName='active' href='/logout'>
            Log Out
          </ActiveLink>
        </li>
      </UL>
    </nav>
  );
};

export default HeaderLoggedIn;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;

  .active {
    /* color: ${props => props.theme.text.primary}; */
  }

  .active:before {
    content: '>';
  }

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

const Option = styled.div`
  align-items: center;
  display: flex;
`;

const Right = styled(Left)`
  fill: ${props => props.theme.fill.primary};
  height: 0.8rem;
  margin-right: 8px;
  transform: rotate(180deg);
`;
