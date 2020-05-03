import PropTypes from 'prop-types';
import DetailBtn from './DetailBtn';
import DeleteBtn from './DeleteBtn';
import IdeaCardInput from './IdeaCardInput';

const IdeaCard = (props) => (
  <li data-testid='IdeaCard'>
    <DetailBtn id={props.node.id} />

    <DeleteBtn id={props.node.id} />

    <IdeaCardInput id={props.node.id} content={props.node.content} />
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
    }),
  }),
};

export default React.memo(IdeaCard);
