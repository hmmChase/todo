// Compare props

export default (prevProps, nextProps) => {
  const obj1 = prevProps;
  console.log('isEqual -> obj1', obj1);
  const obj2 = nextProps;
  console.log('isEqual -> obj2', obj2);

  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      result.push(key);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);

      result.splice(resultKeyIndex, 1);
    }

    return result;
  }, Object.keys(obj2));

  console.log('areEqual -> diff', diff);

  const areEqual = !diff;

  console.log('areEqual -> areEqual', areEqual);

  return areEqual;
};
