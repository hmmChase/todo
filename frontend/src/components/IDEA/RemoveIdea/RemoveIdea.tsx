import { REMOVE_IDEA } from '@/graphql/queries/idea';
import { useMutation } from '@apollo/client';
import { XIconBtn } from '@/components/COMMON/IconBtn/IconBtn';
import type { FC, MouseEventHandler } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

interface Props {
  ideaId: string;
}

interface Idea {
  __ref: string;
}

const RemoveIdea: FC<Props> = ({ ideaId }) => {
  const update: MutationUpdaterFn = cache =>
    cache.modify({
      fields: {
        ideas(existingIdeas = []) {
          // remove idea
          const filteredIdeas = existingIdeas.filter(
            (idea: Idea) => idea.__ref !== `Idea:${ideaId}`
          );

          return filteredIdeas;
        }
      }
    });

  const [removeIdea] = useMutation(REMOVE_IDEA, {
    update: (cache, data) => update(cache, data),

    onError: () => {}
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    // prevent multiple clicks
    e.currentTarget.disabled = true;

    removeIdea({ variables: { id: ideaId } });
  };

  return <XIconBtn name='removeIdea' onClick={handleClick} />;
};

export default RemoveIdea;
