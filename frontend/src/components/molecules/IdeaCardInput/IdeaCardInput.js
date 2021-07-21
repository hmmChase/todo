import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';
import { debounceDelay } from '../../../config';
import { UPDATE_IDEA } from '../../../graphql/queries/idea';
import TextArea from '../../atoms/TextArea/TextArea';

const IdeaCardInput = props => {
  const [content, setContent] = useState(props.content);

  const [updateIdea] = useMutation(UPDATE_IDEA, { onError(_error) {} });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFn = useCallback(
    debounce(
      value => updateIdea({ variables: { id: props.id, content: value } }),
      debounceDelay
    ),
    []
  );

  const onChange = e => {
    setContent(e.target.value);

    debouncedFn(e.target.value);
  };

  return (
    <TextArea
      aria-label='idea content'
      autoSize={{ minRows: 1, maxRows: 10 }}
      value={content}
      onChange={onChange}
    />
  );
};

IdeaCardInput.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default IdeaCardInput;
