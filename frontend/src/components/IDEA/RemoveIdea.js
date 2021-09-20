import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { DELETE_SOFT_IDEA } from '../../graphql/queries/idea';
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

  const [deleteSoftIdea] = useMutation(DELETE_SOFT_IDEA, {
    update(cache) {
      update(cache);
    },

    onError: error => {
      console.log('RemoveIdea DELETE_SOFT_IDEA error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleClick = async e => {
    //? not working
    e.target.disabled = true;

    try {
      await deleteSoftIdea({ variables: { id: ideaId } });
    } catch (error) {
      console.log('RemoveIdea handleClick error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return <XIconBtn aria-label='delete idea' onClick={handleClick} />;
};

RemoveIdea.propTypes = {
  ideaId: PropTypes.string.isRequired
};

export default RemoveIdea;
