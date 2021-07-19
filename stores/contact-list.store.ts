import {IContactListStore} from 'typescript/stores';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {PermissionsAndroid, PermissionStatus, Platform} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

export class ContactListStore implements IContactListStore {
  user_contacts: Contact[] = [];
  selected_contact: Contact | null = null;

  constructor() {
    this.fetchUserContact = this.fetchUserContact.bind(this);

    makeObservable(this, {
      selected_contact: observable,
      selectContact: action,
    });
  }

  getPermissions() {
    if (Platform.OS === 'android') {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      ).then((status: PermissionStatus) => status === 'granted');
    } else {
      return Promise.resolve(true);
    }
  }

  fetchUserContact() {
    this.getPermissions()
      .then((isHasPermission: boolean) =>
        isHasPermission ? Contacts.getAll() : null,
      )
      .then(contacts => {
        if (contacts) {
          runInAction(() => {
            this.user_contacts = contacts;
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  selectContact(contact: Contact | null) {
    this.selected_contact = contact;
  }

  clearContact() {
    this.selectContact(null);
  }
}
