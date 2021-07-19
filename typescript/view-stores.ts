import {IPhoto} from 'typescript/models';
import {Contact} from 'react-native-contacts';
import {FetchStatus} from 'typescript/types';

export interface IMainPageViewStore {
  currentPage: number;
  selectedTagsFilter: string[];
  photosByContact: IPhoto[];
  photoFetchingStateStatus: FetchStatus;
  searchPhotosFromStart: (cleanWhereIsNoFilters?: boolean) => Promise<void>;
  loadMorePhotos: () => Promise<void>;
  addTagFilter: (inputName?: string) => void;
  removeTagFilter: (tagName: string) => void;
  setPage: (page: number) => void;
}
export interface IContactListViewStore {
  contactList: Contact[];
  fetchingStatus: FetchStatus;
}
