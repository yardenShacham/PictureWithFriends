import * as React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {getColorByPreferredTheme} from 'utils/styles-utils';

interface IAppBackgroundProps {
  additionalStyles?: any;
  imageSource?: any;
  children: any;
}

export const AppBackground = ({
  children,
  additionalStyles,
  imageSource,
}: IAppBackgroundProps) => {
  const preferredThemeColor: any = useColorScheme();
  const appBackgroundColor = getColorByPreferredTheme(preferredThemeColor);
  return imageSource ? (
    <ImageBackground
      style={[styles.container, additionalStyles]}
      source={imageSource}>
      {children}
    </ImageBackground>
  ) : (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: appBackgroundColor},
        additionalStyles,
      ]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
  },
});

export default AppBackground;
