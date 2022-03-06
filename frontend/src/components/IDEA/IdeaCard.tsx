import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import graphQLErrors from '../../utils/graphQLErrors';
import { CURRENT_USER } from '../../graphql/queries/user';
import DetailIcon from './DETAIL/DetailIcon';
import RemoveIdea from './RemoveIdea';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaCard: FC<Props> = props => {
  const { authorId, content, ideaId } = props;

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaCard onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const { data } = useQuery(CURRENT_USER, {
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
  padding: 1rem;
`;

const Content = styled.p`
  flex-grow: 1;
  margin: 0 0.25rem 0 0;
`;

const IdeaCardBtns = styled.div`
  display: flex;
`;

const DetailIconn = styled(DetailIcon)`
  margin-right: 0.25rem;
`;
