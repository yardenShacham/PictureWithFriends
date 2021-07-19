import {transformToFlickrPhotos} from 'utils/flickr-utils';
import {FlickerPhoto} from '../enteties/flickr-photo';
import {IPhoto} from 'typescript/models';
import {buildQueryParams} from 'utils/http-service-utils';
const photos = [
  {
    id: 'test-id',
    ownerName: 'test yarden',
    title: 'test title',
    server: 'server-test',
    farm: 'farm-test',
    secret: 'secret-test',
  },
];

test('return Flickr Photos', () => {
  const flickrPhotos = transformToFlickrPhotos(photos);

  const isFlickrPhoto =
    flickrPhotos &&
    flickrPhotos.length > 0 &&
    flickrPhotos[0] instanceof FlickerPhoto;

  expect(isFlickrPhoto).toBeTruthy();
});

test('return Flickr Photos and filter the invalid photos', () => {
  const flickrPhotos = transformToFlickrPhotos([null]);

  expect(flickrPhotos.length === 0).toBeTruthy();
});

test('return url by size', () => {
  const flickrPhotos: IPhoto = transformToFlickrPhotos(photos)[0];

  const s_url = flickrPhotos.getUri(74);
  const t_url = flickrPhotos.getUri(120);
  const m_url = flickrPhotos.getUri(250);
  const n_url = flickrPhotos.getUri(600);
  const c_url = flickrPhotos.getUri(602);
  const c_png_url = flickrPhotos.getUri(602, 'png');

  expect(s_url).toBe(
    'https://live.staticflickr.com/server-test/test-id_secret-test_s.jpg',
  );
  expect(t_url).toBe(
    'https://live.staticflickr.com/server-test/test-id_secret-test_t.jpg',
  );
  expect(m_url).toBe(
    'https://live.staticflickr.com/server-test/test-id_secret-test_m.jpg',
  );
  expect(n_url).toBe(
    'https://live.staticflickr.com/server-test/test-id_secret-test_n.jpg',
  );
  expect(c_url).toBe(
    'https://live.staticflickr.com/server-test/test-id_secret-test_c.jpg',
  );
  expect(c_png_url).toBe(
    'https://live.staticflickr.com/server-test/test-id_secret-test_c.png',
  );
});

test('buildQueryParams sanity', () => {
  const params = {
    basicParameter: 'basicParameter',
    arrayParameter: ['one', 'two'],
  };

  expect(buildQueryParams(params)).toBe(
    '?basicParameter=basicParameter&arrayParameter=one,two',
  );
});

test('buildQueryParams in valid', () => {
  const params = {
    basicParameter: null,
    arrayParameter: ['one', 'two'],
  };

  expect(buildQueryParams(params)).toBe('?arrayParameter=one,two');
});
