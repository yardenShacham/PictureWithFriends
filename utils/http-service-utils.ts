export const buildQueryParams = (params: any = {}) => {
  const pairs = Object.keys(params).reduce((result: string[], name: string) => {
    let value: any = params[name];

    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value = value.join(',');
      }

      return result.concat(`${name}=${value}`);
    }

    return result;
  }, []);

  return pairs.length ? `?${pairs.join('&')}` : '';
};
