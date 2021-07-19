import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface ITextInputProps {
  text: string;
  placeholder: string;
  isNumericOnly?: boolean;
  onChange: (text: string) => void;
}

const AppTextInput = ({
  text,
  onChange,
  placeholder,
  isNumericOnly = false,
}: ITextInputProps) => (
  <TextInput
    value={text}
    style={styles.container}
    onChangeText={onChange}
    placeholder={placeholder}
    numberOfLines={1}
    keyboardType={isNumericOnly ? 'numeric' : 'default'}
  />
);

export default AppTextInput;
const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    height: 38,
    paddingLeft: 8,
  },
});
