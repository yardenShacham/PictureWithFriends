import {APP_VIEW_STORES} from 'configuration-and-constants/app-configuration';
import {ContactListViewStore} from 'view-stores/contact-list.view-store';
import {MainPageViewStore} from 'view-stores/main-page.view-store';

export default (stores: any) => ({
  [APP_VIEW_STORES.CONTACT_LIST_PAGE_VIEW_STORE]: new ContactListViewStore(
    stores,
  ),
  [APP_VIEW_STORES.MAIN_PAGE_VIEW_STORE]: new MainPageViewStore(stores),
});
