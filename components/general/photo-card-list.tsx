import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {
  APP_STORES,
  APP_VIEW_STORES,
} from 'configuration-and-constants/app-configuration';
import {IMainPageViewStore} from 'typescript/view-stores';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PhotoCardListItem from 'components/general/photo-card-list-item';
import {IPhoto} from 'typescript/models';
import {textStyle} from 'utils/styles-utils';
import {FETCH_STATUSES} from 'configuration-and-constants/app-constants';
import {IPhotosStoreStore} from 'typescript/stores';

interface IPhotoCardListProps {
  mainPageViewStore?: IMainPageViewStore;
  photosStore?: IPhotosStoreStore;
}

const BigTitle = ({text, textStyleName, extraStyle}: any) => (
  <View style={[styles.bigTitleContainer, extraStyle]}>
    <Text style={textStyle(textStyleName)}>{text}</Text>
  </View>
);

const NoPhotoCard = () => (
  <BigTitle
    text="There is no Photo right now"
    textStyleName="h1"
    extraStyle={styles.noPhotoCardContainer}
  />
);

const PhotoCardListHeader = ({totalPhotos}: any) => (
  <BigTitle
    text={
      totalPhotos && totalPhotos > 0
        ? `Recent Photos(${totalPhotos})`
        : 'Recent Photos'
    }
    textStyleName="h3"
    extraStyle={styles.photoCardListHeaderContainer}
  />
);

const PhotoCardListFooter = ({isLoading}: any) =>
  isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;

const PhotoCardList = ({
  mainPageViewStore,
  photosStore,
}: IPhotoCardListProps) => {
  const isLoading =
    mainPageViewStore?.photoFetchingStateStatus === FETCH_STATUSES.pending;

  return (
    <View style={styles.container}>
      <PhotoCardListHeader totalPhotos={photosStore?.totalPhotos} />
      <FlatList
        data={mainPageViewStore?.photosByContact || []}
        ListEmptyComponent={NoPhotoCard}
        ListFooterComponent={() => (
          <PhotoCardListFooter isLoading={isLoading} />
        )}
        keyExtractor={(item: IPhoto, index: number) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({item}) => <PhotoCardListItem photo={item} />}
        onEndReached={() => mainPageViewStore?.loadMorePhotos()}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={mainPageViewStore?.searchPhotosFromStart}
          />
        }
        refreshing={isLoading}
      />
    </View>
  );
};

export default inject(
  APP_STORES.PHOTOS_STORE,
  APP_VIEW_STORES.MAIN_PAGE_VIEW_STORE,
)(observer(PhotoCardList));

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    marginTop: 16,
  },
  noPhotoCardContainer: {
    marginTop: 40,
    justifyContent: 'center',
  },
  bigTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoCardListHeaderContainer: {
    paddingLeft: 16,
  },
  loader: {},
});
