import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface CustomInputProps extends TextInputProps {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  errorMessage?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  isPassword = false,
  errorMessage,
  value,
  onChangeText,
  editable = true,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const handleContainerPress = () => {
    if (editable) {
      inputRef.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Pressable
        onPress={handleContainerPress}
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          },
          isFocused && {
            borderColor: colors.inputBorderFocused,
            backgroundColor: colors.card,
            shadowColor: colors.primary,
          },
          !!errorMessage && {
            borderColor: colors.errorBorder,
            backgroundColor: colors.errorBackground,
          },
          !editable && {
            backgroundColor: colors.inputDisabled,
            opacity: 0.7,
          },
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={
              errorMessage
                ? colors.errorText
                : isFocused
                ? colors.primary
                : colors.textMuted
            }
            style={styles.leadingIcon}
          />
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.textInput,
            { color: colors.inputText },
            style,
          ]}
          placeholderTextColor={colors.inputPlaceholder}
          value={value ?? ''}
          onChangeText={onChangeText}
          editable={editable}
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.trailingIcon}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </Pressable>
      {errorMessage ? (
        <Text style={[styles.errorText, { color: colors.errorText }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  leadingIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 0,
    minHeight: 46,
    ...(Platform.OS === 'web'
      ? {
          outlineWidth: 0,
        }
      : {}),
  },
  trailingIcon: {
    padding: 6,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
