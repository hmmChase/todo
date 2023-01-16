import { FC, useContext } from 'react';
import styled from 'styled-components';

import { UserCtx } from '@/context/User';
import IdeaDetailIcon from '@/components/IDEA/DETAIL/IdeaDetailIcon/IdeaDetailIcon';
import RemoveIdea from '@/components/IDEA/RemoveIdea/RemoveIdea';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaItem: FC<Props> = ({ authorId, content, ideaId }) => {
  const { user } = useContext(UserCtx);

  const currentUserIsAdmin = user?.role === 'ADMIN';
  const currentUserIsAuthor = user?.id === authorId;
  const currentUserCanDeleteIdea = currentUserIsAdmin || currentUserIsAuthor;

  return (
    <Article>
      <Content>{content}</Content>

      <IdeaItemBtns>
        <IdeaDetailIconn ideaId={ideaId} />

        {currentUserCanDeleteIdea && <RemoveIdea ideaId={ideaId} />}
      </IdeaItemBtns>
    </Article>
  );
};

export default IdeaItem;

const Article = styled.article`
  display: flex;
  padding: 1rem;
`;

const Content = styled.p`
  flex-grow: 1;
  margin: 0 0.25rem 0 0;
`;

const IdeaItemBtns = styled.div`
  display: flex;
`;

const IdeaDetailIconn = styled(IdeaDetailIcon)`
  margin-right: 0.25rem;
`;
