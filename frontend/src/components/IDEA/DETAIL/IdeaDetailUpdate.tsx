import { FC, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';

import { IdeaInputDebounceDelay } from '../../../constants/config';
import { UPDATE_IDEA } from '../../../graphql/queries/idea';
import IdeaDetailContent from './IdeaDetailContent';

interface Props {
  content: string;
  currentUserOwnsIdea: boolean;
  id: string;
}

const IdeaDetailUpdate: FC<Props> = ({ content, currentUserOwnsIdea, id }) => {
  const [text, setText] = useState(content);

  const [updateIdea] = useMutation(UPDATE_IDEA);

  // executes on blur
  const debouncedFn = useCallback(
    () =>
      debounce(
        (value: string) => updateIdea({ variables: { content: value, id } }),

        IdeaInputDebounceDelay
      ),
    [id, updateIdea]
  );

  const onSetText = (text: string) => {
    setText(text);

    debouncedFn();
  };

  return (
    <IdeaDetailContent
      currentUserOwnsIdea={currentUserOwnsIdea}
      onSetText={onSetText}
      text={text}
    />
  );
};

export default IdeaDetailUpdate;
