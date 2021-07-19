import {FLICKR_METHODS} from 'configuration-and-constants/flickr-constants';
import {IPhoto} from 'typescript/models';
import {IFetchInfo} from 'services/http-service';

const SEARCH_PHOTOS_RESULT: IPhoto[] = [];

export const getMockData = ({params}: IFetchInfo) => {
  const {method} = params;
  switch (method) {
    case FLICKR_METHODS.search:
      return SEARCH_PHOTOS_RESULT;
    default:
      return null;
  }
};
