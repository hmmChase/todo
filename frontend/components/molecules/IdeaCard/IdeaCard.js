import PropTypes from 'prop-types';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import IdeaCardInput from '../IdeaCardInput/IdeaCardInput';
import * as sc from './IdeaCard.style';

const IdeaCard = (props) => (
  <li>
    <sc.IdeaCardBtns className={props.className} data-testid='IdeaCard'>
      <sc.DetailIconn id={props.id} />

      <DeleteIcon id={props.id} />
    </sc.IdeaCardBtns>

    <IdeaCardInput id={props.id} content={props.content} />
  </li>
);

IdeaCard.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(IdeaCard);
