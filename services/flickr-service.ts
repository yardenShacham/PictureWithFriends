import {IHttpService, IPhotosService} from 'typescript/services';
import {
  FLICKR_DOMAIN,
  FLICKR_METHODS,
} from 'configuration-and-constants/flickr-constants';
import {appInjector} from '../app-injector';

import {
  APP_SERVICES,
  FLICKR_API_KEY,
} from 'configuration-and-constants/app-configuration';
import {
  FETCH_RESULT_FORMAT,
  HTTP_SERVICE_NAMES,
} from 'configuration-and-constants/app-constants';
import {IPhotoFilter} from 'typescript/stores';
import {transformToFlickrPhotos} from 'utils/flickr-utils';

export class FlickrService implements IPhotosService {
  flickerHttpService: IHttpService;

  constructor() {
    this.flickerHttpService = (<IHttpService>(
      appInjector?.get(APP_SERVICES.httpService)
    )).setOptions({
      base_url: FLICKR_DOMAIN,
      name: HTTP_SERVICE_NAMES.flickr,
    });
  }

  fetchPhotos({tags, per_page, page}: IPhotoFilter) {
    return this.flickerHttpService
      .get('/', {
        method: FLICKR_METHODS.search,
        api_key: FLICKR_API_KEY,
        tags,
        per_page,
        page,
        format: FETCH_RESULT_FORMAT.json,
        nojsoncallback: 1,
        extras: ['date_taken', 'description'],
      })
      .then((result: any) => {
        return (
          result &&
          result.photos && {
            totalPhotos: result.photos.total,
            totalPages: result.photos.pages,
            allPhotos: transformToFlickrPhotos(result.photos.photo),
          }
        );
      })
      .catch(() => null);
  }
}
