import { FC, Fragment } from 'react';
import styled from 'styled-components';

import { Users } from '@/models/index';
import UserItem from '@/components/USER/UserItem/UserItem';

interface Props {
  users: Users;
}

const UserList: FC<Props> = ({ users }) => {
  const UserItems = users.map(user => (
    <Fragment key={user.id}>
      <hr />

      <LI>
        <hr />

        <UserItem
          userId={user.id}
          email={user.email}
          role={user.role}
          ideas={user.ideas}
        />
      </LI>
    </Fragment>
  ));

  return <UL>{UserItems}</UL>;
};

export default UserList;

const LI = styled.li`
  > hr {
    border-top: 1px solid ${props => props.theme.border.quaternary};
  }
`;

const UL = styled.ul`
  padding: 0;
`;
