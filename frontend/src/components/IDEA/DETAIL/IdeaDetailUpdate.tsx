import { FC, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';

import { IdeaInputDebounceDelay } from '../../../constants/config';
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

  const [updateIdea] = useMutation(UPDATE_IDEA);

  // executes on blur
  const debouncedFn = useCallback(
    debounce(
      value => updateIdea({ variables: { id, content: value } }),
      IdeaInputDebounceDelay
    ),
    [updateIdea]
  );

  const onSetText = (text: string) => {
    setText(text);

    debouncedFn(text);
  };

  return (
    <IdeaDetailContent
      text={text}
      onSetText={onSetText}
      currentUserOwnsIdea={currentUserOwnsIdea}
    />
  );
};

export default IdeaDetailUpdate;
