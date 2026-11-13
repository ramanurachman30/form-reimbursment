import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../constants/theme';

interface ThemeOption {
  mode: ThemeMode;
  icon: keyof typeof Ionicons.glyphMap;
  accessibilityLabel: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { mode: 'system', icon: 'contrast-outline', accessibilityLabel: 'Mode Sistem' },
  { mode: 'light', icon: 'sunny-outline', accessibilityLabel: 'Mode Terang' },
  { mode: 'dark', icon: 'moon-outline', accessibilityLabel: 'Mode Gelap' },
];

export const ThemeSelector: React.FC = () => {
  const { themeMode, setThemeMode, colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.segmentedBg,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      {THEME_OPTIONS.map((opt) => {
        const isActive = themeMode === opt.mode;
        return (
          <TouchableOpacity
            key={opt.mode}
            style={[
              styles.iconButton,
              isActive && [
                styles.iconButtonActive,
                {
                  backgroundColor: colors.segmentedActiveBg,
                  shadowColor: colors.cardShadow,
                },
              ],
            ]}
            onPress={() => setThemeMode(opt.mode)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={opt.accessibilityLabel}
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons
              name={opt.icon}
              size={15}
              color={isActive ? colors.segmentedActiveText : colors.segmentedText}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconButton: {
    width: 30,
    height: 28,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
