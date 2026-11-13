import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const LoginHeader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.logoBadge,
          {
            backgroundColor: colors.logoBadgeBg,
            borderColor: colors.logoBadgeBorder,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/jazzman_logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.appName, { color: colors.text }]}>JazzPortal</Text>
      <Text style={[styles.appTagline, { color: colors.textSecondary }]}>
        Sistem Pengajuan & Klaim Biaya Operasional
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});
