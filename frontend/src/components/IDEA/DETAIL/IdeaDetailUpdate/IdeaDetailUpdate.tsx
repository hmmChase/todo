import { FC, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';

import { IdeaInputDebounceDelay } from '@/constants/config';
import { UPDATE_IDEA } from '@/graphql/queries/idea';
import IdeaDetailContent from '@/components/IDEA/DETAIL/IdeaDetailContent/IdeaDetailContent';

interface Props {
  children: string;
  id: string;
}

const IdeaDetailUpdate: FC<Props> = ({ children, id }) => {
  const [text, setText] = useState(children);

  const [updateIdea] = useMutation(UPDATE_IDEA, { onError: () => {} });

  // Executes on blur
  const debouncedFn = useCallback(
    () =>
      debounce(
        // (value: string) => updateIdea({ variables: { content: value, id } }),
        () => updateIdea({ variables: { content: text, id } }),

        IdeaInputDebounceDelay
      ),
    [id, text, updateIdea]
  );

  const onSetText = (text: string) => {
    setText(text);

    debouncedFn();
  };

  return <IdeaDetailContent onSetText={onSetText}>{text}</IdeaDetailContent>;
};

export default IdeaDetailUpdate;
