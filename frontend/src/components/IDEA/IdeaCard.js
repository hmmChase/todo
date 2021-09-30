// import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import RemoveIdea from './RemoveIdea';
import DetailIcon from './DetailIcon';
import { CURRENT_USER } from '../../graphql/queries/user';
import graphQLErrors from '../../utils/graphQLErrors';

const IdeaCard = props => {
  const { ideaId, content, authorId } = props;

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaCard onError error: ', error);

    // Will set only UserInputError errors
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

// IdeaCard.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default IdeaCard;

export const Article = styled.article`
  display: flex;
`;

const IdeaCardBtns = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const DetailIconn = styled(DetailIcon)`
  margin-right: 5px;
`;

export const Content = styled.p`
  margin: 0;
  align-self: center;
`;
