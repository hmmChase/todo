import PropTypes from 'prop-types';
import IdeaCardInput from './IdeaCardInput';
import DetailBtn from './DetailBtn';
import DeleteBtn from './DeleteBtn';

const IdeaCard = (props) => (
  <li>
    <IdeaCardInput id={props.node.id} content={props.node.content} />

    <DetailBtn id={props.node.id} />

    <DeleteBtn id={props.node.id} />
  </li>
);

IdeaCard.propTypes = {
  node: PropTypes.exact({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.exact({
      __typename: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default React.memo(IdeaCard);
