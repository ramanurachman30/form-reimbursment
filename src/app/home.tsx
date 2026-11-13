import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from '../components/ui/ThemeSelector';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    Alert.alert('Konfirmasi Keluar', 'Apakah Anda yakin ingin keluar dari akun ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 12, 20),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar with Profile and Minimalist Action Controls */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.userBrief}
            onPress={() => router.push('/profile')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Lihat profil pengguna"
          >
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarInitials}>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
                Selamat Datang,
              </Text>
              <Text style={[styles.userNameText, { color: colors.text }]}>{user.name}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.topBarActions}>
            <ThemeSelector />
            <TouchableOpacity
              style={[
                styles.notificationBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
              ]}
              onPress={() => Alert.alert('Notifikasi', 'Belum ada notifikasi baru.')}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Notifikasi"
            >
              <Ionicons name="notifications-outline" size={19} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.profileCardBg,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={styles.profileBadgeRow}>
            <View style={[styles.roleTag, { backgroundColor: colors.primary }]}>
              <Ionicons
                name={user.role === 'approver' ? 'shield-checkmark' : 'briefcase'}
                size={14}
                color="#FFFFFF"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.roleTagText}>{user.roleLabel}</Text>
            </View>
            <Text style={[styles.deptText, { color: colors.textSecondary }]}>
              {user.department}
            </Text>
          </View>
          <Text style={styles.userEmailText}>{user.email}</Text>
          <View style={styles.profileIdRow}>
            <Text style={styles.profileIdLabel}>ID Karyawan:</Text>
            <Text style={[styles.profileIdValue, { color: colors.primary }]}>{user.id}</Text>
          </View>
        </View>

        {/* Dummy Summary Section */}
        <Text style={[styles.sectionHeader, { color: colors.text }]}>
          Ringkasan Reimbursement (Dummy)
        </Text>
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: colors.statBoxBg,
                borderColor: colors.statBoxBorder,
                borderLeftColor: '#3B82F6',
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Diajukan Bulan Ini
            </Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>Rp 2.450.000</Text>
            <Text style={[styles.statSub, { color: colors.textMuted }]}>3 transaksi</Text>
          </View>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: colors.statBoxBg,
                borderColor: colors.statBoxBorder,
                borderLeftColor: '#F59E0B',
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Menunggu Approval
            </Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>Rp 750.000</Text>
            <Text style={[styles.statSub, { color: colors.textMuted }]}>1 transaksi</Text>
          </View>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: colors.statBoxBg,
                borderColor: colors.statBoxBorder,
                borderLeftColor: '#10B981',
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Telah Disetujui
            </Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>Rp 1.700.000</Text>
            <Text style={[styles.statSub, { color: colors.textMuted }]}>2 transaksi</Text>
          </View>
        </View>

        {/* Info Box */}
        <View
          style={[
            styles.infoBanner,
            {
              backgroundColor: colors.infoBannerBg,
              borderColor: colors.infoBannerBorder,
            },
          ]}
        >
          <Ionicons name="information-circle-outline" size={20} color={colors.infoBannerText} />
          <Text style={[styles.infoBannerText, { color: colors.infoBannerText }]}>
            Fitur saat ini menggunakan data dummy dan arsitektur terisolasi. Data siap
            dihubungkan ke API backend sesuai perencanaan.
          </Text>
        </View>

        {/* Minimalist Action Button: Logout */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[
              styles.minimalLogoutButton,
              {
                backgroundColor: isDark
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(239, 68, 68, 0.05)',
                borderColor: isDark
                  ? 'rgba(239, 68, 68, 0.22)'
                  : 'rgba(239, 68, 68, 0.12)',
              },
            ]}
            onPress={handleLogout}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Keluar dari akun"
          >
            <Ionicons
              name="log-out-outline"
              size={17}
              color="#EF4444"
              style={styles.logoutIcon}
            />
            <Text style={styles.minimalLogoutText}>Keluar dari Akun</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userBrief: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  greetingText: {
    fontSize: 12,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '700',
  },
  notificationBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  profileBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  roleTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  deptText: {
    fontSize: 12,
    fontWeight: '500',
  },
  userEmailText: {
    color: '#E2E8F0',
    fontSize: 14,
    marginBottom: 12,
  },
  profileIdRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 10,
  },
  profileIdLabel: {
    color: '#64748B',
    fontSize: 12,
    marginRight: 6,
  },
  profileIdValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  profileActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  profileActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  statsGrid: {
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  statSub: {
    fontSize: 11,
    marginTop: 2,
  },
  infoBanner: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  infoBannerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 18,
  },
  actionSection: {
    marginTop: 8,
    marginBottom: 4,
  },
  minimalLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
  },
  logoutIcon: {
    marginRight: 8,
  },
  minimalLogoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    letterSpacing: 0.2,
  },
});
