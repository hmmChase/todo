import IdeaDetail from './IdeaDetail';

const story = { component: IdeaDetail, title: 'IDEA/DETAIL/IdeaDetail' };

export const ideaDetail = () => (
  <IdeaDetail authorId={'authorId'} content={'content'} ideaId={'ideaId'} />
);

export default story;
