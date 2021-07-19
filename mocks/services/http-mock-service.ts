import {IHttpService} from 'typescript/services';
import {mockDataMap} from 'mocks/data';
import {API_METHODS} from 'configuration-and-constants/app-constants';
import {IFetchInfo} from 'services/http-service';

export class HttpMockService implements IHttpService {
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

  fetch_data(fetchInfo: IFetchInfo) {
    const getMockData = mockDataMap[this.name];
    const data = getMockData(fetchInfo);
    return Promise.resolve(data);
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
