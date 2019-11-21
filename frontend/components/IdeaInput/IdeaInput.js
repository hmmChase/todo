import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';
import { UPDATE_IDEA_MUTATION } from '../../graphql/queries';
import * as sc from './IdeaInput.style';

const IdeaInput = props => {
  const [updateIdea] = useMutation(UPDATE_IDEA_MUTATION, { onError(_err) {} });

  const handleChangeideaInput = debounce(e => {
    updateIdea({ variables: { id: props.id, content: e.target.value } });
  }, 200);

  return (
    <sc.IdeaInput
      aria-label='idea input'
      autoSize={{ minRows: 1, maxRows: 10 }}
      defaultValue={props.content}
      onChange={e => {
        e.persist();
        handleChangeideaInput(e);
      }}
    />
  );
};

IdeaInput.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default IdeaInput;
