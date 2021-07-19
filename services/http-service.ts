 import {IHttpService} from 'typescript/services';
import {buildQueryParams} from 'utils/http-service-utils';
import {API_METHODS} from 'configuration-and-constants/app-constants';

export interface IFetchInfo {
  url: string;
  overrideFullUrl?: string;
  method?: string;
  params?: any;
  authToken?: string;
  extra_headers?: {};
}

export class HttpService implements IHttpService {
  name: string = '';
  base_url: string = '';
  base_authorization: string = '';
  base_headers: any = {
    Accept: 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
  };

  setOptions({
    base_headers,
    base_url,
    base_authorization,
    name,
  }: {
    base_url?: string;
    name?: string;
    base_headers?: {};
    base_authorization?: string;
  }) {
    if (base_url) {
      this.base_url = base_url;
    }
    if (name) {
      this.name = name;
    }
    if (base_headers) {
      this.base_headers = base_headers;
    }
    if (base_authorization) {
      this.base_authorization = base_authorization;
    }

    return this;
  }

  fetch_data({
    overrideFullUrl,
    url,
    authToken,
    method,
    params,
    extra_headers,
  }: IFetchInfo) {
    let requestUrl = overrideFullUrl
      ? overrideFullUrl
      : `${this.base_url}${url}`;
    let requestBody = null;
    let headers = extra_headers
      ? Object.assign({}, this.base_headers, extra_headers)
      : this.base_headers;

    if (method === 'GET') {
      requestUrl += buildQueryParams(params);
    } else {
      requestBody = JSON.stringify(params);
    }

    if (authToken) {
      Object.assign(headers, {
        Authorization: `Token token=${authToken || this.base_authorization}`,
      });
    }

    return fetch(requestUrl, {
      method,
      headers,
      body: requestBody,
    }).then(response => {
      if (response && response.text) {
        return response.text().then(text => {
          let json;
          try {
            json = JSON.parse(text);
          } catch (e) {
            throw {
              name: e?.name,
              message: e?.message,
              stack: e?.stack,
              responseText: text,
              responseJson: null,
            };
          }

          if (!response.ok) {
            throw {
              name: `Request failed with status ${response.status}`,
              message: response.url || '',
              stack: response.type || '',
              responseText: text,
              responseJson: json,
            };
          }
          return json;
        });
      } else {
        throw {
          name: `Request failed with status ${response.status}`,
          message: response.url || '',
          stack: response.type || '',
          responseText: `${response.status}`,
        };
      }
    });
  }

  get(url: string, params?: any) {
    return this.fetch_data({
      url,
      method: API_METHODS.get,
      params,
    });
  }

  post(url: string, body?: any) {
    return this.fetch_data({
      url,
      method: API_METHODS.post,
      params: body,
    });
  }
}
