export const load = async wrapper => {
  await new Promise(resolve => setTimeout(resolve, 0));

  wrapper.update();
};
