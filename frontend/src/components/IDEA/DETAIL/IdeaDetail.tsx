import { FC } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { CURRENT_USER } from '../../../graphql/queries/user';
import IdeaDetailUpdate from './IdeaDetailUpdate';
import RemoveIdea from '../RemoveIdea';

interface Props {
  idea: { author: { id: string }; content: string; id: string };
}

const IdeaDetail: FC<Props> = ({ idea: { author, content, id } }) => {
  const { data } = useQuery(CURRENT_USER, { fetchPolicy: 'network-only' });

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
        content={content}
        currentUserOwnsIdea={currentUserOwnsIdea}
        id={id}
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
