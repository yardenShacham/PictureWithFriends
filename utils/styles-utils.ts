import {COLORS} from 'configuration-and-constants/styles/colors';
import {TEXT_STYLES} from '../styles/text-styles';

const colorByPreferredTheme: any = {
  light: COLORS.veryLightBlue70,
  dark: COLORS.charcoalGrey,
};

export const getColorByPreferredTheme = (preferredTheme?: string) =>
  preferredTheme
    ? colorByPreferredTheme[preferredTheme] || COLORS.veryLightBlue70
    : COLORS.veryLightBlue70;

export const textStyle = (
  name: string,
  color: string = COLORS.charcoalGrey,
  props: any = {},
) => {
  return {
    // @ts-ignore
    ...TEXT_STYLES[name],
    color,
    ...props,
  };
};
