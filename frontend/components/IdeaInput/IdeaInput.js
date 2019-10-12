import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';

import { UPDATE_IDEA_MUTATION } from '../../graphql/queries';
import * as sc from './IdeaInput.style';

const IdeaInput = props => {
  const [content, setContent] = useState(props.content);

  // Suppress console output
  const handleError = err => err;

  const [updateIdea] = useMutation(UPDATE_IDEA_MUTATION, {
    update(cache, { data }) {
      handleUpdate(cache, data);
    },
    onError(err) {
      handleError(err);
    }
  });

  const handleChangeideaInput = e => {
    setContent(e.target.value);

    debounce(() => updateIdea({ variables: { id: props.id, content } }), 200);
  };

  return (
    <sc.IdeaInput
      aria-label="idea input"
      autosize={{ minRows: 1, maxRows: 10 }}
      value={content}
      onChange={handleChangeideaInput}
    />
  );
};

IdeaInput.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default React.memo(IdeaInput);
