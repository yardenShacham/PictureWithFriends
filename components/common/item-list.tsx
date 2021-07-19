import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from 'configuration-and-constants/styles/colors';
import {textStyle as getTextStyle} from 'utils/styles-utils';
import {TId} from 'typescript/types';

interface IItemListProps<T> {
  items: T[];
  onRemoveItem?: (item: T) => void;
  getDisplayName: (item: T) => string;
  getId: (item: T) => TId;
  textStyle: {};
}

interface ISingleItemProps<T> {
  item: T;
  getDisplayName: (item: T) => string;
  onRemoveItem?: (item: T) => void;
  textStyle: {};
}

const SingleItem = ({
  getDisplayName,
  onRemoveItem,
  textStyle,
  item,
}: ISingleItemProps<any>) => (
  <TouchableOpacity
    style={styles.singleItem}
    onPress={() => onRemoveItem && onRemoveItem(item)}>
    <Text numberOfLines={1} style={[textStyle, styles.displayName]}>
      {getDisplayName(item)}
    </Text>
    <View>
      <Text style={[getTextStyle('h6'), styles.closeX]}>X</Text>
    </View>
  </TouchableOpacity>
);

export const ItemList = ({
  items,
  onRemoveItem,
  getDisplayName,
  getId,
  textStyle,
}: IItemListProps<any>) => (
  <View style={styles.container}>
    {items &&
      items.map((item: any) => (
        <SingleItem
          key={getId(item)}
          item={item}
          getDisplayName={getDisplayName}
          onRemoveItem={onRemoveItem}
          textStyle={textStyle}
        />
      ))}
  </View>
);

const styles = StyleSheet.create<any>({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  singleItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    height: 34,
    minWidth: 60,
    maxWidth: 120,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.greyish,
    marginRight: 8,
    marginBottom: 8,
  },
  displayName: {
    width: '70%',
  },
  closeX: {
    marginLeft: 8,
  },
});
