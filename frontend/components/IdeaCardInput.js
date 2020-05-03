import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';
import { debounceDelay } from '../config';
import { UPDATE_IDEA } from '../graphql/queries';

const IdeaCardInput = (props) => {
  const [content, setContent] = useState(props.content);

  const [updateIdea] = useMutation(UPDATE_IDEA, { onError(_error) {} });

  const debouncedFn = useCallback(
    debounce(
      (value) => updateIdea({ variables: { id: props.id, content: value } }),
      debounceDelay
    ),
    []
  );

  const onChange = (e) => {
    setContent(e.target.value);

    debouncedFn(e.target.value);
  };

  return <input aria-label='idea input' value={content} onChange={onChange} />;
};

IdeaCardInput.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default IdeaCardInput;
