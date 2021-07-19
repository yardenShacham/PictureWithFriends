import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {
  APP_ROUTES,
  APP_STORES,
  APP_VIEW_STORES,
} from 'configuration-and-constants/app-configuration';
import {
  IContactListViewStore,
  IMainPageViewStore,
} from 'typescript/view-stores';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {textStyle} from 'utils/styles-utils';
import {FETCH_STATUSES} from 'configuration-and-constants/app-constants';
import {IContactListStore} from 'typescript/stores';
import ContactFlatListItem from 'components/contact-list/contact-flat-list-item';
import {Contact} from 'react-native-contacts';
import {useNavigation} from '@react-navigation/native';

interface IContactFlatListProps {
  contactListPageViewStore?: IContactListViewStore;
  mainPageViewStore?: IMainPageViewStore;
  contactListStore?: IContactListStore;
}

const BigTitle = ({text, textStyleName, extraStyle}: any) => (
  <View style={[styles.bigTitleContainer, extraStyle]}>
    <Text style={textStyle(textStyleName)}>{text}</Text>
  </View>
);

const NoContacts = () => (
  <BigTitle
    text="There is no available contact right now"
    textStyleName="h1"
    extraStyle={styles.noContactContainer}
  />
);

const ContactFlatListHeader = () => (
  <BigTitle
    text="Contact list"
    textStyleName="h3"
    extraStyle={styles.contactFlatListHeaderContainer}
  />
);

const ContactFlatListFooter = ({isLoading}: any) =>
  isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;

const ContactFlatList = ({
  contactListStore,
  contactListPageViewStore,
  mainPageViewStore,
}: IContactFlatListProps) => {
  const isLoading =
    contactListPageViewStore?.fetchingStatus === FETCH_STATUSES.pending;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ContactFlatListHeader />
      <FlatList
        data={contactListPageViewStore?.contactList || []}
        ListEmptyComponent={NoContacts}
        ListFooterComponent={() => (
          <ContactFlatListFooter isLoading={isLoading} />
        )}
        keyExtractor={(item: Contact, index: number) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({item}) => (
          <ContactFlatListItem
            contact={item}
            onContactPressed={() => {
              mainPageViewStore?.addTagFilter(item.givenName);
              navigation.navigate(APP_ROUTES.MAIN);
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={contactListStore?.fetchUserContact}
          />
        }
        refreshing={isLoading}
      />
    </View>
  );
};

export default inject(
  APP_STORES.CONTACT_LIST_STORE,
  APP_VIEW_STORES.CONTACT_LIST_PAGE_VIEW_STORE,
  APP_VIEW_STORES.MAIN_PAGE_VIEW_STORE,
)(observer(ContactFlatList));

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    marginTop: 8,
  },
  noContactContainer: {
    marginTop: 40,
    justifyContent: 'center',
  },
  bigTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactFlatListHeaderContainer: {
    paddingLeft: 8,
    marginBottom: 12,
  },
  loader: {},
});
