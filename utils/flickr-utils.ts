import {FlickerPhoto} from '../enteties/flickr-photo';

export const transformToFlickrPhotos = (photos: any[]) =>
  photos.reduce((acc, photo: any) => {
    if (!!photo) {
      acc.push(new FlickerPhoto(photo));
    }
    return acc;
  }, []);
