import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { REMOVE_IDEA } from '../../graphql/queries/idea';
import graphQLErrors from '../../utils/graphQLErrors';
import { XIconBtn } from '../REUSEABLE/IconBtn';

const RemoveIdea = props => {
  const { ideaId } = props;

  const [errorMsg, setErrorMsg] = useState();

  const update = cache =>
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

  const onError = error => {
    console.log('RemoveIdea onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [removeIdea] = useMutation(REMOVE_IDEA, {
    update: cache => update(cache),

    onError: error => onError(error)
  });

  const handleClick = async e => {
    //? prevent multiple clicks - not working?
    e.target.disabled = true;

    try {
      await removeIdea({ variables: { id: ideaId } });
    } catch (error) {
      console.log('RemoveIdea handleClick error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return <XIconBtn aria-label='remove idea' onClick={handleClick} />;
};

RemoveIdea.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default RemoveIdea;
