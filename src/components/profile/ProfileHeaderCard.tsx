import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types/auth';
import { useTheme } from '../../context/ThemeContext';

interface ProfileHeaderCardProps {
  user: User;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({ user }) => {
  const { colors } = useTheme();

  const handleEditAvatar = () => {
    Alert.alert(
      'Ubah Foto Profil',
      'Fitur upload foto profil akan terhubung dengan kamera / galeri pada rilis mendatang.',
      [{ text: 'OK' }]
    );
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.profileCardBg,
          borderColor: colors.cardBorder,
          shadowColor: colors.cardShadow,
        },
      ]}
    >
      <View style={styles.avatarSection}>
        <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarInitials}>{initials}</Text>
          <TouchableOpacity
            style={[
              styles.cameraBadge,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={handleEditAvatar}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Ubah foto profil"
          >
            <Ionicons name="camera" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        <View style={styles.badgesRow}>
          <View style={[styles.roleBadge, { backgroundColor: colors.primary }]}>
            <Ionicons
              name={user.role === 'approver' ? 'shield-checkmark' : 'briefcase'}
              size={13}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.roleText}>{user.roleLabel}</Text>
          </View>
          <View style={[styles.idBadge, { borderColor: '#475569' }]}>
            <Text style={styles.idText}>ID: {user.id}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: 0.5,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    elevation: 2,
  },
  userName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 14,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  idBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  idText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
});

