import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import AppTextInput from 'components/common/text-input';
import {COLORS} from 'configuration-and-constants/styles/colors';
import AppButton from 'components/common/app-button';

interface ITextInputWithButtonProps {
  text: string;
  placeholder: string;
  onButtonClicked: (text: string) => void;
  btnColor?: string;
  btnLabel: string;
  containerStyle?: {};
  onChange: (text: string) => void;
}

const TextInputWithButton = ({
  text,
  placeholder,
  onButtonClicked,
  btnColor,
  btnLabel,
  onChange,
  containerStyle = {},
}: ITextInputWithButtonProps) => {
  const btnStyles = btnColor
    ? [styles.button, {backgroundColor: btnColor}]
    : styles.button;

  return (
    <View style={[styles.container, containerStyle]}>
      <AppTextInput text={text} placeholder={placeholder} onChange={onChange} />
      <AppButton
        onPress={() => onButtonClicked(text)}
        label={btnLabel}
        containerStyle={btnStyles}
      />
    </View>
  );
};

export default TextInputWithButton;
const styles = StyleSheet.create<any>({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.greyish,
    borderRadius: 3,
    backgroundColor: COLORS.whiteFour,
    padding: 2,
  },
  button: {
    height: 32,
    backgroundColor: COLORS.mediumGreen,
    marginRight: 4,
  },
});
