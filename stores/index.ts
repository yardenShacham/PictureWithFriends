import {ContactListStore} from './contact-list.store';
import {PhotosStore} from './photos.store';
import {APP_STORES} from 'configuration-and-constants/app-configuration';

export default () => ({
  [APP_STORES.CONTACT_LIST_STORE]: new ContactListStore(),
  [APP_STORES.PHOTOS_STORE]: new PhotosStore(),
});
