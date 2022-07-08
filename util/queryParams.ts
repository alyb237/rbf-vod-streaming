export function queryParamString(queryParam: string | string[] | undefined) {
  console.log('query', queryParam);
  if (!queryParam) return undefined;
  if (Array.isArray(queryParam)) {
    return queryParam[0];
  }
  return queryParam;
}
