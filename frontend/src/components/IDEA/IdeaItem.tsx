import { FC } from 'react';
import styled from 'styled-components';

import IdeaDetailIcon from './DETAIL/IdeaDetailIcon';
import RemoveIdea from './RemoveIdea';
import useUser from '../../hooks/useUser';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaItem: FC<Props> = ({ authorId, content, ideaId }) => {
  const { user } = useUser();

  const currentUserOwnsIdea = user?.id === authorId;

  return (
    <Article>
      <Content>{content}</Content>

      <IdeaItemBtns>
        <IdeaDetailIconn ideaId={ideaId} />

        {currentUserOwnsIdea && <RemoveIdea ideaId={ideaId} />}
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