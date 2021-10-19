import { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';
// import styled from 'styled-components';

import graphQLErrors from '../../utils/graphQLErrors';
import { IdeaInputDebounceDelay } from '../../configs/config';
import { UPDATE_IDEA } from '../../graphql/queries/idea';
import IdeaDetailContent from './IdeaDetailContent';

const IdeaDetailUpdate = props => {
  const { id, content } = props;

  const storedText = useRef(content);

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaDetailUpdate onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [updateIdea] = useMutation(UPDATE_IDEA, {
    onError: error => onError(error)
  });

  const debouncedFn = useCallback(
    debounce(
      value => updateIdea({ variables: { id: props.id, content: value } }),
      IdeaInputDebounceDelay
    ),
    [updateIdea]
  );

  const onSetText = text => {
    storedText.current = text;

    debouncedFn(text);
  };

  return (
    <IdeaDetailContent
      id={id}
      content={content}
      text={storedText.current}
      onSetText={onSetText}
    />
  );
};

IdeaDetailUpdate.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default IdeaDetailUpdate;
