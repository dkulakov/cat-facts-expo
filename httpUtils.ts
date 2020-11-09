export const constructEndpointUrl = (base: string) => (
  current: string
): string => [base, current].join('');

export const formatUrl = (url: string, params: any): string => {
  const paramsString = new URLSearchParams(params).toString();
  if (!paramsString) return url;

  return `${url}?${paramsString}`;
};

export const dataFetcher = (endpoint: string) => {
  return fetch(endpoint).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  });
};
