// import PropTypes from 'prop-types';

import UpdateIdea from './EditIdea';

const IdeaCard = props => {
  const { content, id } = props;

  return (
    <>
      <p>{content}</p>

      <UpdateIdea ideaId={id} />
    </>
  );
};

// IdeaCard.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default React.memo(IdeaCard);
