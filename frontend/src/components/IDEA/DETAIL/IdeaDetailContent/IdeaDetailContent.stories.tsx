import IdeaDetailContent from './IdeaDetailContent';

const story = {
  component: IdeaDetailContent,
  title: 'IDEA/DETAIL/IdeaDetailContent'
};

export const ideaDetailContent = () => (
  <IdeaDetailContent
    currentUserOwnsIdea={false}
    onSetText={function (text: string): void {
      throw new Error('Function not implemented.');
    }}
    text={'text'}
  />
);

export default story;
