import {HttpService} from 'services/http-service';

const httpService = new HttpService();
test('save options', () => {
  expect(httpService.name).toBe('');
  const name = 'test name';
  const base_url = 'test url';
  httpService.setOptions({
    name,
    base_url,
  });
  expect(httpService.name).toBe(name);
  expect(httpService.base_url).toBe(base_url);
});
