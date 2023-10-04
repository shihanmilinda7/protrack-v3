export function filterDataSource(data: any[]) {
  const uniqueKeyMap: Record<string, { id: number; item: any }> = {}; // Object to track uniqueKey and maximum id

  data.forEach((item) => {
    const { id, uniqueKey } = item;

    if (!uniqueKeyMap[uniqueKey] || id > uniqueKeyMap[uniqueKey].id) {
      uniqueKeyMap[uniqueKey] = { id, item };
    }
  });

  // Create a new array with the filtered objects
  const filteredData = Object.values(uniqueKeyMap).map((entry) => entry.item);

  return filteredData;
}

export function modifiedDataForSave(data: any[], year: any) {
  const modifiedData = data.map((element) => ({
    name: element.name,
    location: element.location,
    startDate: element.startDate,
    endDate: element.endDate,
    color: element.color,
    uniqueKey: element.uniqueKey,
    year: year.toString(),
  }));

  return modifiedData;
}
