import IdeaItem from '@/components/IDEA/IdeaItem/IdeaItem';
import styled from 'styled-components';
import type { FC } from 'react';
import type { Ideas as Ideass } from '@/models/index';

interface Props {
  ideas: Ideass;
}

const Ideas: FC<Props> = ({ ideas }) => {
  return (
    <>
      {ideas.length ? (
        <UL>
          {ideas.map(idea => (
            <LI key={idea.id}>
              <hr />

              <IdeaItem
                authorId={idea.author!.id}
                content={idea.content}
                ideaId={idea.id}
              />
            </LI>
          ))}
        </UL>
      ) : (
        <p>There are no ideas</p>
      )}
    </>
  );
};

export default Ideas;

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
