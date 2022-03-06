import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import graphQLErrors from '../../../utils/graphQLErrors';
import { CURRENT_USER } from '../../../graphql/queries/user';
import RemoveIdea from '../RemoveIdea';
import IdeaDetailUpdate from './IdeaDetailUpdate';

interface Props {
  idea: {
    id: string;
    author: { id: string };
    content: string;
  };
}

const IdeaDetail: FC<Props> = props => {
  const { idea } = props;
  const { id, content, author } = idea;

  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('IdeaDetail onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const { data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',

    onError: error => onError(error)
  });

  const currentUserId = data?.currentUser?.user?.id;

  const currentUserOwnsIdea = currentUserId === author.id;

  return (
    <Container>
      {currentUserOwnsIdea && (
        <RemoveIdeaWrap>
          <RemoveIdea ideaId={id} />
        </RemoveIdeaWrap>
      )}

      <IdeaDetailUpdate
        id={id}
        content={content}
        currentUserOwnsIdea={currentUserOwnsIdea}
      />
    </Container>
  );
};

export default IdeaDetail;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 2rem 1rem;
`;

const RemoveIdeaWrap = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;
`;
