import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { CURRENT_USER } from '../../graphql/queries/user';
import RemoveIdea from './RemoveIdea';
import IdeaDetailUpdate from './IdeaDetailUpdate';
import graphQLErrors from '../../utils/graphQLErrors';

const IdeaDetail = props => {
  const { idea } = props;
  const { id, content, author } = idea;

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaDetail onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const { loading, error, data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',

    onError: error => onError(error)
  });

  const currentUserId = data?.currentUser?.user?.id;

  const currentUserOwnsIdea = currentUserId === author.id;

  return (
    <IdeaDetaill>
      <>
        <IdeaDetailUpdate id={id} content={content} />

        {currentUserOwnsIdea && <RemoveIdea ideaId={id} />}
      </>
    </IdeaDetaill>
  );
};

IdeaDetail.propTypes = {
  idea: PropTypes.shape({
    author: PropTypes.shape({ id: PropTypes.any.isRequired }).isRequired,
    content: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired
  })
};

export default IdeaDetail;

const IdeaDetaill = styled.section`
  margin-bottom: 2rem;
`;
