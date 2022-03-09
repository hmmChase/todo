const createAddIdea = ideaVar => {
  const createNewIdeaId = allIdeas =>
    allIdeas.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

  const createNewIdea = (content, allIdeas) => {
    return { content, id: createNewIdeaId(allIdeas) };
  };

  return content => {
    const allIdeas = ideaVar();

    ideaVar(allIdeas.concat([createNewIdea(content, allIdeas)]));
  };
};

export default createAddIdea;
