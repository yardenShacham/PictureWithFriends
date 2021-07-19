import * as React from 'react';
import {DATE_FORMATS} from 'configuration-and-constants/app-configuration';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {textStyle} from 'utils/styles-utils';
import {IPhoto} from 'typescript/models';
import {format} from 'utils/date-utils';
import {COLORS} from 'configuration-and-constants/styles/colors';

interface IPhotoCardListItemProps {
  photo: IPhoto;
  size?: number;
}

const PhotoCardListItem = ({photo, size = 225}: IPhotoCardListItemProps) => {
  const imgSource = {
    uri: photo.getUri(size),
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        const medUrlSize = photo.getUri(800);
        Linking.canOpenURL(medUrlSize).then(supported => {
          if (supported) {
            Linking.openURL(medUrlSize);
          }
        });
      }}>
      <Text style={[textStyle('t4'), styles.headerSection]}>
        {photo.ownerName}
      </Text>
      {!!photo.date_taken && (
        <Text style={[textStyle('t4'), styles.headerSection]}>
          {format(photo.date_taken, DATE_FORMATS.APP_DATE)}
        </Text>
      )}

      {!!photo.description && (
        <Text numberOfLines={4} style={[textStyle('t4'), styles.description]}>
          {photo.description}
        </Text>
      )}
      <ImageBackground
        style={[
          styles.image,
          {
            height: size,
          },
        ]}
        source={imgSource}
      />
    </TouchableOpacity>
  );
};

export default PhotoCardListItem;

const styles = StyleSheet.create<any>({
  cardContainer: {
    margin: 16,
    height: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.greyish,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  headerCard: {
    margin: 8,
  },
  description: {
    margin: 8,
    maxHeight: '30%',
  },
  headerSection: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
