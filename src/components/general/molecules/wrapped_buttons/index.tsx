import React from 'react'
import Button from '../../../general/atoms/button'
import { StyleSheet, ViewStyle } from 'react-native'
import { H5 } from '../../../general/atoms/headings';
import { responsiveSize } from '../../../../utils/responsive';
import theme from '../../../../constants/theme';


type Properties = {
  title: string,
  onPress: () => void,
  buttonStyle?: ViewStyle,
  disabled?: boolean,
  loading?: boolean,
  testID?: string;

}
type IconButtonProperties = {
  icon: React.ReactNode,
  onPress: () => void,
  buttonStyle?: ViewStyle,
  disabled?: boolean,
}
export const PrimaryButton = ({
  title, onPress, buttonStyle, disabled, loading,
}: Properties) => {
  return (
    <Button
      onPress={onPress}
      buttonStyle={{ ...styles.primary, ...buttonStyle }}
      disabled={disabled}
      loading={loading}
    >
      <H5 text={title} type="semibold" style={styles.primaryText} />
    </Button>
  );
};

export const SecondaryButton = ({
  title, onPress, buttonStyle, disabled, loading,
}: Properties) => {
  return (
    <Button
      onPress={onPress}
      buttonStyle={{ ...styles.secondary, ...buttonStyle }}
      disabled={disabled}
      loading={loading}
      loaderColor={theme.color.primary[500]}
    >
      <H5 text={title} type="semibold" style={styles.secondaryText}  />
    </Button>
  );
};

export const IconButton = ({ icon, onPress, buttonStyle, disabled }: IconButtonProperties) => (
  <Button
    buttonStyle={{ ...styles.iconButton, ...buttonStyle }}
    onPress={onPress}
    disabled={disabled}
  >
    {icon}
  </Button>
)

const styles = StyleSheet.create({
  primary: {
    height: responsiveSize(56),
  },
  primaryText: {
    color: theme.color.neutral[100],
  },
  secondary: {
    height: responsiveSize(56),
    backgroundColor: theme.color.neutral[100],
    borderWidth: 1,
    borderColor: theme.color.primary[500],
  },
  secondaryText: {
    color: theme.color.primary[500],
  },
  iconButton: {
    backgroundColor: theme.color.neutral[100],
    borderWidth: 1,
    borderColor: theme.color.tertiary[200],
    paddingVertical: responsiveSize(15),
  }
});