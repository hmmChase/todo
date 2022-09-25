import IdeaDetailUpdate from './IdeaDetailUpdate';

const story = {
  component: IdeaDetailUpdate,
  title: 'IDEA/DETAIL/IdeaDetailUpdate'
};

export const ideaDetailUpdate = () => (
  <IdeaDetailUpdate content={'content'} currentUserOwnsIdea={false} id={'id'} />
);

export default story;
