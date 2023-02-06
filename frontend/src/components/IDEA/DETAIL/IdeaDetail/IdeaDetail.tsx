import { useContext } from 'react';
import { UserCtx } from '@/context/User';
import IdeaDetailUpdate from '@/components/IDEA/DETAIL/IdeaDetailUpdate/IdeaDetailUpdate';
import RemoveIdea from '@/components/IDEA/RemoveIdea/RemoveIdea';
import styled from 'styled-components';
import type { FC } from 'react';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaDetail: FC<Props> = ({ authorId, content, ideaId }) => {
  const { user } = useContext(UserCtx);

  const currentUserIsAdmin = user?.role === 'ADMIN';
  const currentUserIsAuthor = user?.id === authorId;
  const currentUserAuthorized = currentUserIsAdmin || currentUserIsAuthor;

  return (
    <Section>
      {currentUserAuthorized ? (
        <IdeaDetailUpdate id={ideaId}>{content}</IdeaDetailUpdate>
      ) : (
        <p>{content}</p>
      )}

      {currentUserAuthorized && (
        <RemoveIdeaWrap>
          <RemoveIdea ideaId={ideaId} />
        </RemoveIdeaWrap>
      )}
    </Section>
  );
};

export default IdeaDetail;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 2rem 1rem;
`;

const RemoveIdeaWrap = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;
`;
