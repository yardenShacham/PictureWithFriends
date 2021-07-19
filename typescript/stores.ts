import {IPhoto} from 'typescript/models';
import {Contact} from 'react-native-contacts';

export interface IContactListStore {
  user_contacts: Contact[];
  selected_contact?: Contact | null;
  fetchUserContact: () => void;
  selectContact: (contact: Contact | null) => void;
  clearContact: () => void;
}
export interface IPhotoFilter {
  tags: string[];
  per_page?: number;
  page?: number;
}

export interface IPhotosStoreStore {
  current_photos: IPhoto[];
  totalPhotos: number;
  totalPages: number;
  fetchPhotos: (filter: IPhotoFilter) => Promise<void>;
  loadMorePhotos: (filter: IPhotoFilter) => Promise<void>;
  cleanPhotos: () => void;
}
