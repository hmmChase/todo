import styled from 'styled-components';

import IdeaCard from './IdeaCard';

const Ideas = props => {
  const { ideas } = props;

  const ideaCards = ideas.map(idea => (
    <Wrapper key={idea.id}>
      <hr />

      <li>
        <IdeaCard
          ideaId={idea.id}
          content={idea.content}
          authorId={idea.author.id}
        />
      </li>
    </Wrapper>
  ));

  return <UL>{ideaCards}</UL>;
};

export default Ideas;

const Wrapper = styled.div`
  :first-child {
    > hr {
      display: none;
    }
  }
`;

const UL = styled.ul`
  padding-left: 0;
  list-style: none;
  width: 100%;
`;
