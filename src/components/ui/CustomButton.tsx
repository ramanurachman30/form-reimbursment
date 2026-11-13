import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const { colors } = useTheme();
  const isButtonDisabled = disabled || isLoading;

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: colors.primaryLight,
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 3,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return {
          color: colors.primary,
        };
      case 'secondary':
        return {
          color: colors.primaryText,
        };
      case 'primary':
      default:
        return {
          color: colors.primaryText,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
      style={[
        styles.baseContainer,
        getContainerStyle(),
        isButtonDisabled && styles.disabledContainer,
        style,
      ]}
      accessibilityRole="button"
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.primaryText}
        />
      ) : (
        <Text style={[styles.baseText, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  disabledContainer: {
    opacity: 0.55,
    shadowOpacity: 0,
    elevation: 0,
  },
  baseText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
