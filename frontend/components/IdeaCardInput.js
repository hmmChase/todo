import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';
import { UPDATE_IDEA } from '../graphql/queries';

const IdeaCardInput = (props) => {
  const [content, setContent] = useState(props.content);

  const [updateIdea] = useMutation(UPDATE_IDEA, { onError(_error) {} });

  const onChange = debounce((e) => {
    setContent(e.target.value);

    updateIdea({ variables: { id: props.id, content: e.target.value } });
  }, 200);

  return (
    <input
      aria-label='idea input'
      value={content}
      onChange={(e) => {
        e.persist();

        onChange(e);
      }}
    />
  );
};

IdeaCardInput.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default IdeaCardInput;
