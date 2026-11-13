import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const LoginFooter: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.footer}>
      <Text style={[styles.footerNote, { color: colors.textMuted }]}>
        Terhubung secara aman • Data dienkripsi end-to-end
      </Text>
      <Text style={[styles.versionText, { color: colors.textMuted }]}>
        Versi 1.0.0 (Expo SDK 58)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerNote: {
    fontSize: 12,
    textAlign: 'center',
  },
  versionText: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
});
