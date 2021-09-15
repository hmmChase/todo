// import PropTypes from 'prop-types';
import Link from 'next/link';

import EditIdea from './EditIdea';
import RemoveIdea from './RemoveIdea';

const IdeaCard = props => {
  const { id, content } = props;

  return (
    <>
      <Link href={`/idea/${id}`}>
        <a>{content}</a>
      </Link>

      <EditIdea ideaId={id} />

      <RemoveIdea ideaId={id} />
    </>
  );
};

// IdeaCard.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default IdeaCard;
