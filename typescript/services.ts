import {IPhoto} from 'typescript/models';
import {IFetchInfo} from 'services/http-service';
import {IPhotoFilter} from 'typescript/stores';

interface IFetchPhotoInfo {
  totalPhotos: number;
  totalPages: number;
  allPhotos: IPhoto[];
}
export interface IPhotosService {
  fetchPhotos: (params: IPhotoFilter) => Promise<IFetchPhotoInfo | null>;
}

export interface IHttpService {
  setOptions: (params: {
    base_url?: string;
    name?: string;
    base_headers?: {};
    base_authorization?: string;
  }) => IHttpService;
  fetch_data: (params: IFetchInfo) => Promise<any>;
  get: (url: string, params?: any) => Promise<any>;
  post: (url: string, body?: any) => Promise<any>;
}
