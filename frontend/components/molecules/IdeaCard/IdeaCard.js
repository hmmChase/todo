import PropTypes from 'prop-types';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import IdeaInput from '../IdeaInput/IdeaInput';
import * as sc from './IdeaCard.style';

const IdeaCard = props => (
  <div className={props.className} data-testid='IdeaCard'>
    <sc.IdeaCardBtns>
      <sc.DetailIconn id={props.id} />

      <DeleteIcon id={props.id} />
    </sc.IdeaCardBtns>
    <IdeaInput id={props.id} content={props.content} />
  </div>
);

IdeaCard.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default React.memo(IdeaCard);
