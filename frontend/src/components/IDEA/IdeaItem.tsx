import { FC } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { CURRENT_USER } from '../../graphql/queries/user';
import DetailIcon from './DETAIL/DetailIcon';
import RemoveIdea from './RemoveIdea';

interface Props {
  authorId: string;
  content: string;
  ideaId: string;
}

const IdeaItem: FC<Props> = ({ authorId, content, ideaId }) => {
  const { data } = useQuery(CURRENT_USER, { fetchPolicy: 'network-only' });

  const currentUserId = data?.currentUser?.user?.id;

  const currentUserOwnsIdea = currentUserId === authorId;

  return (
    <Article>
      <Content>{content}</Content>

      <IdeaItemBtns>
        <DetailIconn ideaId={ideaId} />

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

const DetailIconn = styled(DetailIcon)`
  margin-right: 0.25rem;
`;
