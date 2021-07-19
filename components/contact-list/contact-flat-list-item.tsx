import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {textStyle} from 'utils/styles-utils';
import {Contact} from 'react-native-contacts';

interface IContactFlatListItemProps {
  contact: Contact;
  onContactPressed: (contact: Contact) => void;
}

const ContactFlatListItem = ({
  contact,
  onContactPressed,
}: IContactFlatListItemProps) => {
  const phoneNumber = contact.phoneNumbers.find(p => !!p)?.number || null;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onContactPressed(contact)}>
      {contact.hasThumbnail ? (
        <Image
          style={styles.thumbnailImage}
          source={{uri: contact.thumbnailPath}}
        />
      ) : (
        <View style={styles.thumbnailImage}>
          <Text style={textStyle('h4')}>{contact.givenName[0]}</Text>
        </View>
      )}
      <Text style={textStyle('h4')}>{contact.givenName}</Text>
      {!!phoneNumber && <Text style={textStyle('h4')}> - {phoneNumber}</Text>}
    </TouchableOpacity>
  );
};

export default ContactFlatListItem;

const styles = StyleSheet.create<any>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 8,
    borderWidth: 1,
  },
  thumbnailImage: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
