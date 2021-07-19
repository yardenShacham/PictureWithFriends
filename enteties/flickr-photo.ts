import {IPhoto} from 'typescript/models';
import {TId} from 'typescript/types';
import {FLICKR_PHOTOS_DOMAIN} from 'configuration-and-constants/flickr-constants';

export class FlickerPhoto implements IPhoto {
  id: TId;
  date_taken: string;
  ownerName: string;
  title: string;
  description: string;
  farm: number;
  server: number;
  secret: number;

  constructor(params?: any) {
    this.id = params.id;
    this.title = params.title;
    this.description =
      (params.description && params.description._content) || '';
    this.date_taken = params.datetaken;
    this.ownerName = params.owner;
    this.server = params.server;
    this.farm = params.farm;
    this.secret = params.secret;
  }

  getSizeSuffix(sizePx: number) {
    return sizePx < 75
      ? 's'
      : sizePx < 150
      ? 't'
      : sizePx > 200 && sizePx < 300
      ? 'm'
      : sizePx > 600
      ? 'c'
      : 'n';
  }

  getUri(sizePx: number, extension: string = 'jpg') {
    const sizeSuffix = this.getSizeSuffix(sizePx);
    return `${FLICKR_PHOTOS_DOMAIN}/${this.server}/${this.id}_${this.secret}_${sizeSuffix}.${extension}`;
  }
}
