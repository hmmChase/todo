const paginate = ({
  after: cursor,
  pageSize = 2,
  results, // all nodes
  getCursor = () => null // can pass in a function to calculate an item's cursor
}) => {
  console.log('-------------------------------');

  if (pageSize < 1) return [];

  // first page
  if (!cursor) return results.slice(0, pageSize);

  // after pages
  const cursorIndex = results.findIndex(item => {
    // if an item has a `createdAt` on it, use that, otherwise try to generate one
    let itemCursor = item.createdAt ? item.createdAt : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

export default paginate;
