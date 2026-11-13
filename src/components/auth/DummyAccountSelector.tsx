import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_ACCOUNTS, DummyAccount } from '../../constants/dummyData';
import { useTheme } from '../../context/ThemeContext';

interface DummyAccountSelectorProps {
  onSelectAccount: (account: DummyAccount) => void;
}

export const DummyAccountSelector: React.FC<DummyAccountSelectorProps> = ({
  onSelectAccount,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={[styles.dividerLine, { backgroundColor: colors.cardBorder }]} />
        <Text style={[styles.dividerText, { color: colors.textMuted }]}>
          Gunakan Akun Demo (Dummy Data)
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.cardBorder }]} />
      </View>

      <View style={styles.cardsContainer}>
        {DUMMY_ACCOUNTS.map((acc) => (
          <TouchableOpacity
            key={acc.user.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.dummyCardBg,
                borderColor: colors.dummyCardBorder,
              },
            ]}
            onPress={() => onSelectAccount(acc)}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Pilih akun demo ${acc.user.name}`}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.dummyAvatarBg }]}>
                <Ionicons
                  name={acc.user.role === 'approver' ? 'shield-checkmark' : 'person'}
                  size={16}
                  color={colors.primary}
                />
              </View>
              <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]}>{acc.user.name}</Text>
                <Text style={[styles.role, { color: colors.primary }]}>{acc.user.roleLabel}</Text>
              </View>
            </View>
            <Text style={[styles.email, { color: colors.textSecondary }]} numberOfLines={1}>
              {acc.credentials.email}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '500',
  },
  cardsContainer: {
    gap: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
  },
  role: {
    fontSize: 11,
    fontWeight: '600',
  },
  email: {
    fontSize: 12,
    marginLeft: 38,
  },
});
