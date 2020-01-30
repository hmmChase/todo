import PropTypes from 'prop-types';
import DetailIcon from '../DetailIcon/DetailIcon';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import IdeaInput from '../IdeaInput/IdeaInput';
import * as sc from './IdeaCard.style';

const IdeaCard = props => (
  <sc.IdeaCard data-testid='IdeaCard'>
    <DetailIcon id={props.id} />

    <DeleteIcon id={props.id} />

    <IdeaInput id={props.id} content={props.content} />
  </sc.IdeaCard>
);

IdeaCard.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default React.memo(IdeaCard);
