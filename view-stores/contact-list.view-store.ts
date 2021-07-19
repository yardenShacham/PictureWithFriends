import {IContactListViewStore} from 'typescript/view-stores';
import {action, computed, makeObservable, observable} from 'mobx';
import {IContactListStore} from 'typescript/stores';
import {FetchStatus} from 'typescript/types';
import {FETCH_STATUSES} from 'configuration-and-constants/app-constants';

export class ContactListViewStore implements IContactListViewStore {
  contactListStore: IContactListStore;
  fetchingStatus: FetchStatus = FETCH_STATUSES.done;

  constructor({contactListStore}: any) {
    this.contactListStore = contactListStore;
    makeObservable(this, {
      contactList: computed,
      fetchingStatus: observable,
      setFetchingStatus: action.bound,
    });
  }

  get contactList() {
    return this.contactListStore.user_contacts;
  }

  setFetchingStatus(fetchStatus: FetchStatus) {
    this.fetchingStatus = fetchStatus;
  }
}
