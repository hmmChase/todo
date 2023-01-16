import { FC } from 'react';
import styled from 'styled-components';

import { Ideas } from '@/models/index';
import IdeaList from '@/components/IDEA/IdeaList/IdeaList';

interface Props {
  email: string;
  ideas: Ideas | undefined;
  role: string;
  userId: string;
}

const IdeaItem: FC<Props> = ({ email, ideas, role, userId }) => (
  <List>
    <ListItem>
      <ItemLabel>Id:</ItemLabel>

      {userId}
    </ListItem>

    <ListItem>
      <ItemLabel>Email:</ItemLabel>

      {email}
    </ListItem>

    <ListItem>
      <ItemLabel>Role:</ItemLabel>

      {role}
    </ListItem>

    <ListItem>
      <ItemLabel>Ideas:</ItemLabel>

      <IdeaList ideas={ideas} />
    </ListItem>
  </List>
);

export default IdeaItem;

const List = styled.ul`
  /* display: flex; */
  /* flex-direction: column; */
  padding: 0rem;
`;

const ListItem = styled.li`
  align-items: center;
  display: flex;
  margin: 0;
`;

const ItemLabel = styled.p`
  font-weight: 600;
  margin: 0.25rem;
`;
