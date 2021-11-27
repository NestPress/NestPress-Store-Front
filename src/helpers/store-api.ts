export function filter(array, filters = {}) {
  let results = array;
  for (let key in filters) {
    const [field, kind] = key.split('_');
    switch (kind) {
      case 'min': {
        let value = Number(filters[key]);
        results = results.filter((entry) => entry[field] >= value);
        break;
      }
      case 'max': {
        let value = Number(filters[key]);
        results = results.filter((entry) => entry[field] <= value);
        break;
      }
      case 'includes':
        results = results.filter((entry) =>
          entry[field].includes(filters[key]),
        );
        break;
      case undefined:
      case 'equals':
        // eslint-disable-next-line eqeqeq
        results = results.filter((entry) => entry[field] == filters[key]);
        break;
      default:
    }
  }
  return results;
}