export const load = async (wrapper, amount = 0) => {
  await new Promise(resolve => setTimeout(resolve, amount));

  wrapper.update();
};
