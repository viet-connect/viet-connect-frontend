export const objectToQueryString = (v: object) => Object.entries(v)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
