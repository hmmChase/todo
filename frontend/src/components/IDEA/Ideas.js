import styled from 'styled-components';

import IdeaCard from './IdeaCard';

const Ideas = props => {
  const { ideas } = props;

  const ideaCards = ideas.map(idea => (
    <LI key={idea.id}>
      <hr />

      <IdeaCard
        ideaId={idea.id}
        content={idea.content}
        authorId={idea.author.id}
      />
    </LI>
  ));

  return <UL>{ideaCards}</UL>;
};

export default Ideas;

const LI = styled.li`
  > hr {
    border-top: 1px solid ${props => props.theme.colors.lightBlue};
    margin: 0;
  }

  :first-of-type {
    > hr {
      display: none;
    }
  }
`;

const UL = styled.ul`
  padding-left: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;
