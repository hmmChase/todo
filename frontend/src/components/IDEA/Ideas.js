import PropTypes from 'prop-types';
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

Ideas.propTypes = {
  ideas: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  )
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
