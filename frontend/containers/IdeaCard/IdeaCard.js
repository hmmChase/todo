import PropTypes from 'prop-types';

import DetailIcon from '../../components/DetailIcon/DetailIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import IdeaInput from '../../components/IdeaInput.js/IdeaInput';
import * as sc from './IdeaCard.style';

const IdeaCard = React.memo(props => (
  <sc.IdeaCard>
    <DetailIcon id={props.id} />

    <DeleteIcon id={props.id} />

    <IdeaInput id={props.id} content={props.content} />
  </sc.IdeaCard>
));

IdeaCard.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default IdeaCard;
