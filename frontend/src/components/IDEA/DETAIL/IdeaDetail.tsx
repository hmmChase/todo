import { FC } from 'react';
import styled from 'styled-components';

import IdeaDetailUpdate from './IdeaDetailUpdate';
import RemoveIdea from '../RemoveIdea';
import useUser from '../../../hooks/useUser';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaDetail: FC<Props> = ({ authorId, content, ideaId }) => {
  const { user } = useUser();

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
