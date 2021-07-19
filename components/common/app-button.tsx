import * as React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {textStyle} from 'utils/styles-utils';
import {COLORS} from 'configuration-and-constants/styles/colors';

interface IAppButtonProps {
  containerStyle?: {};
  btnTextStyle?: {};
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}
const AppButton = ({
  containerStyle,
  btnTextStyle,
  label,
  onPress,
}: IAppButtonProps) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    onPress={onPress}>
    <Text style={btnTextStyle || textStyle('t5', COLORS.whiteFour)}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default AppButton;

const styles = StyleSheet.create<any>({
  container: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
