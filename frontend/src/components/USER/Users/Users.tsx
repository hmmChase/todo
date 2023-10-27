import { Fragment } from 'react';
import styled from 'styled-components';

import type { Users as Userss } from '@/models/index';
import UserItem from '@/components/USER/UserItem/UserItem';

interface Props {
  users: Userss;
}

const Users = ({ users }: Props) => {
  return (
    <>
      {users && users.length ? (
        <UL>
          {users.map(user => (
            <Fragment key={user.id}>
              <hr />

              <LI>
                <hr />

                <UserItem
                  email={user.email}
                  tasks={user.tasks}
                  role={user.role}
                  userId={user.id}
                />
              </LI>
            </Fragment>
          ))}
        </UL>
      ) : (
        <p>There are no users</p>
      )}
    </>
  );
};

export default Users;

const LI = styled.li`
  > hr {
    border-top: 1px solid ${props => props.theme.border.quaternary};
  }
`;

const UL = styled.ul`
  padding: 0;
`;
