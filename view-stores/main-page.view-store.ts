import {IMainPageViewStore} from 'typescript/view-stores';
import {action, computed, makeObservable, observable} from 'mobx';
import {IContactListStore, IPhotosStoreStore} from 'typescript/stores';
import {FetchStatus} from 'typescript/types';
import {FETCH_STATUSES} from 'configuration-and-constants/app-constants';

export class MainPageViewStore implements IMainPageViewStore {
  contactListStore: IContactListStore;
  photosStore: IPhotosStoreStore;
  selectedTagsFilter: string[] = [];
  photoFetchingStateStatus: FetchStatus = FETCH_STATUSES.done;
  fetchPhotosPerPage: number = 10;
  currentPage: number = 1;

  constructor({contactListStore, photosStore}: any) {
    this.contactListStore = contactListStore;
    this.photosStore = photosStore;

    this.searchPhotosFromStart = this.searchPhotosFromStart.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);

    makeObservable(this, {
      selectedTagsFilter: observable,
      photoFetchingStateStatus: observable,
      photosByContact: computed,
      addTagFilter: action.bound,
      removeTagFilter: action.bound,
      setFetchingStatus: action.bound,
    });
  }

  get photosByContact() {
    return this.photosStore.current_photos;
  }

  addTagFilter(inputName?: string) {
    let tagName = inputName || '';
    const selectedContactName =
      this.contactListStore.selected_contact?.givenName;
    if (selectedContactName) {
      tagName = selectedContactName;
      this.contactListStore.clearContact();
    }

    this.selectedTagsFilter = [...this.selectedTagsFilter, tagName];
  }

  removeTagFilter(tagName: string) {
    this.selectedTagsFilter = this.selectedTagsFilter.filter(
      (tagNameItem: string) => tagNameItem !== tagName,
    );
  }

  async searchPhotosFromStart(cleanWhereIsNoFilters: boolean = false) {
    try {
      this.setPage(1);
      this.setFetchingStatus(FETCH_STATUSES.pending);
      if (this.selectedTagsFilter && this.selectedTagsFilter.length > 0) {
        await this.photosStore.fetchPhotos({
          tags: this.selectedTagsFilter,
          per_page: this.fetchPhotosPerPage,
          page: this.currentPage,
        });
      } else if (cleanWhereIsNoFilters) {
        this.photosStore.cleanPhotos();
      }

      this.setFetchingStatus(FETCH_STATUSES.done);
    } catch (e) {
      this.setFetchingStatus(FETCH_STATUSES.error);
    }
  }

  async loadMorePhotos() {
    try {
      if (this.currentPage + 1 <= this.photosStore.totalPages) {
        this.setFetchingStatus(FETCH_STATUSES.pending);
        this.setPage(this.currentPage + 1);
        await this.photosStore.loadMorePhotos({
          tags: this.selectedTagsFilter,
          per_page: this.fetchPhotosPerPage,
          page: this.currentPage,
        });
        this.setFetchingStatus(FETCH_STATUSES.done);
      }
    } catch (e) {
      this.setFetchingStatus(FETCH_STATUSES.error);
    }
  }

  setFetchingStatus(fetchStatus: FetchStatus) {
    this.photoFetchingStateStatus = fetchStatus;
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
