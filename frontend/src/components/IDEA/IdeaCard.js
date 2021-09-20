// import PropTypes from 'prop-types';
import styled from 'styled-components';

import RemoveIdea from './RemoveIdea';
import DetailIcon from './DetailIcon';

const IdeaCard = props => {
  const { id, content } = props;

  return (
    <Article>
      <Content>{content}</Content>

      <IdeaCardBtns>
        <DetailIconn ideaId={id} />

        <RemoveIdea ideaId={id} />
      </IdeaCardBtns>
    </Article>
  );
};

// IdeaCard.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default IdeaCard;

export const Article = styled.article`
  display: flex;
`;

const IdeaCardBtns = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const DetailIconn = styled(DetailIcon)`
  margin-right: 5px;
`;

export const Content = styled.p`
  margin: 0;
  align-self: center;
`;
