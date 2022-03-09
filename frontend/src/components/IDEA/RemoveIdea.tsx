import { FC, FormEvent } from 'react';
import { ApolloCache, useMutation } from '@apollo/client';

import { REMOVE_IDEA } from '../../graphql/queries/idea';
import { XIconBtn } from '../REUSEABLE/IconBtn';

interface Props {
  ideaId: string;
}

const RemoveIdea: FC<Props> = props => {
  const { ideaId } = props;

  const update = (cache: ApolloCache<any>) =>
    cache.modify({
      fields: {
        ideas(existingIdeas = []) {
          // Remove idea
          const filteredIdeas = existingIdeas.filter(
            idea => idea.__ref !== `Idea:${ideaId}`
          );

          return filteredIdeas;
        }
      }
    });

  const [removeIdea] = useMutation(REMOVE_IDEA, {
    update: cache => update(cache)
  });

  const handleClick = async (e: FormEvent) => {
    //? prevent multiple clicks - not working?
    e.target.disabled = true;

    try {
      await removeIdea({ variables: { id: ideaId } });
    } catch (error) {
      // console.log('RemoveIdea handleClick error: ', error);
    }
  };

  return <XIconBtn aria-label='remove idea' onClick={handleClick} />;
};

export default RemoveIdea;
