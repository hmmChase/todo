import { FC, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';

import { IdeaInputDebounceDelay } from '../../../constants/config';
import graphQLErrors from '../../../utils/graphQLErrors';
import { UPDATE_IDEA } from '../../../graphql/queries/idea';
import IdeaDetailContent from './IdeaDetailContent';

interface Props {
  content: string;
  currentUserOwnsIdea?: boolean;
  id: string;
}

const IdeaDetailUpdate: FC<Props> = props => {
  const { id, content, currentUserOwnsIdea } = props;

  const [text, setText] = useState(content);

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaDetailUpdate onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [updateIdea] = useMutation(UPDATE_IDEA, {
    onError: error => onError(error)
  });

  // executes on blur
  const debouncedFn = useCallback(
    debounce(
      value => updateIdea({ variables: { id: props.id, content: value } }),
      IdeaInputDebounceDelay
    ),
    [updateIdea]
  );

  const onSetText = text => {
    setText(text);

    debouncedFn(text);
  };

  return (
    <IdeaDetailContent
      id={id}
      content={content}
      text={text}
      onSetText={onSetText}
      currentUserOwnsIdea={currentUserOwnsIdea}
    />
  );
};

export default IdeaDetailUpdate;
