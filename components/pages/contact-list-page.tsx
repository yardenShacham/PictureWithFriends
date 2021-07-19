import * as React from 'react';
import {StyleSheet} from 'react-native';
import AppButton from 'components/common/app-button';
import {
  APP_ROUTES,
  APP_VIEW_STORES,
} from 'configuration-and-constants/app-configuration';
import {textStyle} from 'utils/styles-utils';
import AppBackground from 'components/common/app-background';
import ContactFlatList from 'components/contact-list/contact-flat-list';
import {COLORS} from 'configuration-and-constants/styles/colors';
import {inject, observer} from 'mobx-react';
import {IContactListViewStore} from 'typescript/view-stores';

interface IContactListPageProps {
  navigation: any;
  contactListPageViewStore?: IContactListViewStore;
}

class ContactListPage extends React.Component<IContactListPageProps> {
  render() {
    return (
      <AppBackground additionalStyles={styles.container}>
        <AppButton
          label="go back"
          btnTextStyle={textStyle('h5', COLORS.blue)}
          containerStyle={styles.btnContainerStyle}
          onPress={() => this.props.navigation.navigate(APP_ROUTES.MAIN)}
        />
        <ContactFlatList />
      </AppBackground>
    );
  }
}

export default inject(APP_VIEW_STORES.CONTACT_LIST_PAGE_VIEW_STORE)(
  observer(ContactListPage),
);

const styles = StyleSheet.create<any>({
  container: {},
  btnContainerStyle: {
    height: 40,
    width: 80,
    marginRight: 4,
  },
});
