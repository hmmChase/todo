import { FC, useContext } from 'react';
import styled from 'styled-components';

import { UserCtx } from '@/context/User';
import IdeaDetailUpdate from '@/components/IDEA/DETAIL/IdeaDetailUpdate';
import RemoveIdea from '@/components/IDEA/RemoveIdea';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaDetail: FC<Props> = ({ authorId, content, ideaId }) => {
  const { user } = useContext(UserCtx);

  const currentUserOwnsIdea = user?.id === authorId;

  return (
    <Container>
      {currentUserOwnsIdea && (
        <RemoveIdeaWrap>
          <RemoveIdea ideaId={ideaId} />
        </RemoveIdeaWrap>
      )}

      <IdeaDetailUpdate
        content={content}
        currentUserOwnsIdea={currentUserOwnsIdea}
        id={ideaId}
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
