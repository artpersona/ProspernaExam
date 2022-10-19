export const collectIdsAndDocs = data => {
  let newData = [];
  Object.entries(data).forEach(([key, value]) => {
    newData = [
      ...newData,
      {
        id: key,
        ...value,
      },
    ];
  });
  return newData;
};
