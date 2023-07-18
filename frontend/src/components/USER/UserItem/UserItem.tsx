import Ideas from '@/components/IDEA/Ideas/Ideas';
import styled from 'styled-components';
import type { FC } from 'react';
import type { Ideas as Ideass } from '@/models/index';

interface Props {
  email?: string;
  ideas?: Ideass;
  role: string;
  userId: string;
}

const IdeaItem: FC<Props> = ({ email, ideas, role, userId }) => (
  <List>
    <ListItem>
      <ItemLabel>Id:</ItemLabel>

      {userId}
    </ListItem>
    {/* 
    <ListItem>
      <ItemLabel>Email:</ItemLabel>

      {email}
    </ListItem> */}

    <ListItem>
      <ItemLabel>Role:</ItemLabel>

      {role}
    </ListItem>

    {/* {ideas && (
      <ListItem>
        <ItemLabel>Ideas:</ItemLabel>

        <Ideas ideas={ideas} />
      </ListItem>
    )} */}
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
