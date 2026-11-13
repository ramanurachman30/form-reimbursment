import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface ProfileSectionCardProps {
  title: string;
  children: ReactNode;
  rightAction?: ReactNode;
  bottomAction?: ReactNode;
}

export const ProfileSectionCard: React.FC<ProfileSectionCardProps> = ({
  title,
  children,
  rightAction,
  bottomAction,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          shadowColor: colors.cardShadow,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {rightAction}
      </View>
      <View style={styles.content}>{children}</View>
      {bottomAction && <View style={styles.bottomActionContainer}>{bottomAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  content: {
    marginTop: 4,
  },
  bottomActionContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
});
