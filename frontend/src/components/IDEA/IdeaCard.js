import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import RemoveIdea from './RemoveIdea';
import DetailIcon from './DetailIcon';
import { CURRENT_USER } from '../../graphql/queries/user';
import graphQLErrors from '../../utils/graphQLErrors';

const IdeaCard = props => {
  const { authorId, content, ideaId } = props;

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaCard onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const { loading, error, data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',

    onError: error => onError(error)
  });

  const currentUserId = data?.currentUser?.user?.id;

  const currentUserOwnsIdea = currentUserId === authorId;

  return (
    <Article>
      <Content>{content}</Content>

      <IdeaCardBtns>
        <DetailIconn ideaId={ideaId} />

        {currentUserOwnsIdea && <RemoveIdea ideaId={ideaId} />}
      </IdeaCardBtns>
    </Article>
  );
};

IdeaCard.propTypes = {
  authorId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  ideaId: PropTypes.string.isRequired
};

export default IdeaCard;

const Article = styled.article`
  display: flex;
  padding: 0.5rem;
  align-content: center;
`;

const Content = styled.p`
  margin: 0 0.25rem 0 0;
  flex-grow: 1;
`;

const IdeaCardBtns = styled.div`
  /* width: 100%; */
  display: flex;
  /* justify-content: flex-end; */
  /* align-items: flex-end; */
  /* justify-items: flex-end; */
  /* align-content: flex-end; */
  /* align-self: flex-end; */
`;

const DetailIconn = styled(DetailIcon)`
  margin-right: 0.25rem;
`;
