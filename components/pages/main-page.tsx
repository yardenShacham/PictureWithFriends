import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {textStyle} from 'utils/styles-utils';
import AppBackground from 'components/common/app-background';
import {COLORS} from 'configuration-and-constants/styles/colors';
import TextInputWithButton from 'components/common/text-input-with-button';
import {action, makeObservable, observable, reaction} from 'mobx';
import {
  APP_ROUTES,
  APP_VIEW_STORES,
} from 'configuration-and-constants/app-configuration';
import {IMainPageViewStore} from 'typescript/view-stores';
import TagsFilterList from 'components/general/tags-filter-list';
import PhotoCardList from 'components/general/photo-card-list';

interface IMainPageProps {
  navigation: any;
  mainPageViewStore?: IMainPageViewStore;
}

class MainPage extends React.Component<IMainPageProps> {
  inputText: string = '';
  fetchPhotosReactionDisposer: any;
  constructor(props: IMainPageProps) {
    super(props);
    this.navigateToContactListPage = this.navigateToContactListPage.bind(this);
    this.addTagFilter = this.addTagFilter.bind(this);

    makeObservable(this, {
      inputText: observable,
      updateText: action.bound,
    });
  }

  render() {
    const isUserStartTyping = this.inputText.length > 0;
    const onButtonClicked = isUserStartTyping
      ? this.addTagFilter
      : this.navigateToContactListPage;

    const btnLabel = isUserStartTyping ? 'Add Tag' : 'Select from contact list';

    return (
      <AppBackground additionalStyles={styles.container}>
        <View style={styles.title}>
          <Text style={textStyle('huge', COLORS.vermillion)}>
            Photo With Friends
          </Text>
        </View>
        <TextInputWithButton
          text={this.inputText}
          onChange={this.updateText}
          btnLabel={btnLabel}
          placeholder="Tag filter"
          onButtonClicked={onButtonClicked}
          containerStyle={styles.textInputWithButtonContainer}
        />
        <TagsFilterList />
        <PhotoCardList />
      </AppBackground>
    );
  }

  componentDidMount() {
    const {mainPageViewStore} = this.props;
    if (!this.fetchPhotosReactionDisposer) {
      this.fetchPhotosReactionDisposer = reaction(
        () => mainPageViewStore?.selectedTagsFilter,
        () => mainPageViewStore?.searchPhotosFromStart(true),
      );
    }
  }

  componentWillUnmount() {
    if (this.fetchPhotosReactionDisposer) {
      this.fetchPhotosReactionDisposer();
      this.fetchPhotosReactionDisposer = undefined;
    }
  }

  navigateToContactListPage() {
    const {navigation} = this.props;
    navigation.navigate(APP_ROUTES.CONTACT_LIST);
  }

  addTagFilter(text: string) {
    const {mainPageViewStore} = this.props;

    mainPageViewStore?.addTagFilter(text);
    this.updateText('');
  }

  updateText(text: string) {
    this.inputText = text;
  }
}

const styles = StyleSheet.create<any>({
  container: {},
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  textInputWithButtonContainer: {
    margin: 16,
  },
});

export default inject(APP_VIEW_STORES.MAIN_PAGE_VIEW_STORE)(observer(MainPage));
