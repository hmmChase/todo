import styled from 'styled-components';

import IdeaCard from './IdeaCard';

const Ideas = props => {
  const { ideas } = props;

  const ideaCards = ideas.map(idea => (
    <Wrapper key={idea.id}>
      <hr />

      <li>
        <IdeaCard id={idea.id} content={idea.content} />
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
