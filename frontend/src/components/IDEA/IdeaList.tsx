import { FC } from 'react';
import styled from 'styled-components';

import { Ideas } from '../../models';
import IdeaItem from './IdeaItem';

interface Props {
  ideas: Ideas;
}

const IdeaList: FC<Props> = ({ ideas }) => {
  const ideaItems = ideas.map(idea => (
    <LI key={idea.id}>
      <hr />

      <IdeaItem
        authorId={idea.author.id}
        content={idea.content}
        ideaId={idea.id}
      />
    </LI>
  ));

  return <UL>{ideaItems}</UL>;
};

export default IdeaList;

const LI = styled.li`
  > hr {
    border-top: 1px solid ${props => props.theme.border.quaternary};
    margin: 0;
  }

  :first-of-type {
    > hr {
      display: none;
    }
  }
`;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  width: 100%;
`;
