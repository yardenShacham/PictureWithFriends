import {getMockData as getMockDataFlickr} from './flickr-fetch-data';
import {HTTP_SERVICE_NAMES} from 'configuration-and-constants/app-constants';

export const mockDataMap = {
  [HTTP_SERVICE_NAMES.flickr]: getMockDataFlickr,
};
