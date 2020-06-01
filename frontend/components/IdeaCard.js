import PropTypes from 'prop-types';
import IdeaCardInput from './IdeaCardInput';
import DetailBtn from './DetailBtn';
import DeleteBtn from './DeleteBtn';

const IdeaCard = (props) => (
  <li>
    <div>
      <DetailBtn id={props.id} />

      <DeleteBtn id={props.id} />
    </div>

    <IdeaCardInput id={props.id} content={props.content} />
  </li>
);

IdeaCard.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default React.memo(IdeaCard);
