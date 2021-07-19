import {IPhotoFilter, IPhotosStoreStore} from 'typescript/stores';
import {IPhoto} from 'typescript/models';
import {action, makeObservable, observable} from 'mobx';
import {IPhotosService} from 'typescript/services';
import {appInjector} from '../app-injector';
import {APP_SERVICES} from 'configuration-and-constants/app-configuration';

export class PhotosStore implements IPhotosStoreStore {
  current_photos: IPhoto[] = [];
  totalPhotos: number = 0;
  totalPages: number = 0;
  photosService?: IPhotosService;

  constructor() {
    makeObservable(this, {
      current_photos: observable,
      setPhotos: action.bound,
      setTotalPhotos: action.bound,
      setTotalPages: action.bound,
    });
    this.photosService = appInjector?.get(APP_SERVICES.photosService);
  }

  async fetchPhotos(filter: IPhotoFilter) {
    const photosInfo: any = await this.photosService?.fetchPhotos(filter);
    if (photosInfo) {
      if (photosInfo.allPhotos) {
        this.setPhotos(photosInfo.allPhotos);
      }
      if (photosInfo.totalPhotos) {
        this.setTotalPhotos(photosInfo.totalPhotos);
      }
      if (photosInfo.totalPages) {
        this.setTotalPages(photosInfo.totalPages);
      }
    }
  }

  cleanPhotos() {
    this.setPhotos([]);
    this.setTotalPhotos(0);
    this.setTotalPages(0);
  }

  async loadMorePhotos(filter: IPhotoFilter) {
    if ((filter.page || 0) <= this.totalPages) {
      const photosInfo: any = await this.photosService?.fetchPhotos(filter);
      if (photosInfo) {
        if (photosInfo.allPhotos) {
          this.setPhotos(this.current_photos.concat(photosInfo.allPhotos));
        }
      }
    }
  }

  setPhotos(photos: IPhoto[]) {
    this.current_photos = photos;
  }

  setTotalPhotos(totalPhotos: number) {
    this.totalPhotos = totalPhotos;
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }
}
