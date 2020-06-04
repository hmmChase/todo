import PropTypes from 'prop-types';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import IdeaCardInput from '../IdeaCardInput/IdeaCardInput';
import * as sc from './IdeaCard.style';

const IdeaCard = (props) => (
  <li className={props.className} data-testid='IdeaCard'>
    <sc.IdeaCardBtns>
      <sc.DetailIconn id={props.id} aria-label='idea detail' />

      <DeleteIcon id={props.id} aria-label='delete idea' />
    </sc.IdeaCardBtns>

    <IdeaCardInput
      id={props.id}
      content={props.content}
      aria-label='idea input'
    />
  </li>
);

IdeaCard.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(IdeaCard);
