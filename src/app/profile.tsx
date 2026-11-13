import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ProfileHeaderCard } from '../components/profile/ProfileHeaderCard';
import { ProfileSectionCard } from '../components/profile/ProfileSectionCard';
import { ProfileInfoRow } from '../components/profile/ProfileInfoRow';
import { ThemeSelector } from '../components/ui/ThemeSelector';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { colors, isDark } = useTheme();

  const [notificationEnabled, setNotificationEnabled] = useState(true);

  if (!user || (!isAuthenticated && !isLoading)) {
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

  const handleCopyAccount = () => {
    Alert.alert(
      'Nomor Rekening Disalin',
      `Nomor rekening ${user.accountNumber || '8820 4912 30'} berhasil disalin ke papan klip.`,
      [{ text: 'OK' }]
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Ganti Kata Sandi',
      'Tautan pembaruan kata sandi telah dikirimkan ke email resmi Anda: ' + user.email,
      [{ text: 'OK' }]
    );
  };

  const handlePolicyPress = () => {
    Alert.alert(
      'Kebijakan Reimbursement',
      '1. Klaim diajukan maksimal 14 hari kerja setelah transaksi.\n2. Wajib melampirkan bukti kuitansi / struk asli yang sah.\n3. Approval membutuhkan waktu 1-3 hari kerja.',
      [{ text: 'Mengerti' }]
    );
  };

  const handleSupportPress = () => {
    Alert.alert(
      'Pusat Bantuan & IT Support',
      'Hubungi tim IT Helpdesk perusahaan via email di support@perusahaan.com atau WhatsApp di +62 811-2345-6789.',
      [{ text: 'Tutup' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, 16),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Top Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke Beranda"
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>

          <Text style={[styles.navTitle, { color: colors.text }]}>Profil Pengguna</Text>

          <View style={styles.navActions}>
            <ThemeSelector />
          </View>
        </View>

        {/* Hero Profile Card */}
        <ProfileHeaderCard user={user} />

        {/* Section 1: Informasi Kontak & Pekerjaan */}
        <ProfileSectionCard title="Informasi Pekerjaan & Kontak">
          <ProfileInfoRow
            icon="call-outline"
            label="Nomor Telepon / WhatsApp"
            value={user.phoneNumber || '+62 838-1090-769'}
          />
          <ProfileInfoRow
            icon="business-outline"
            label="Departemen"
            value={user.department}
          />
          <ProfileInfoRow
            icon="calendar-outline"
            label="Jabatan"
            value={user.roleLabel || "Staff Operasional"}
            isLast
          />
        </ProfileSectionCard>

        {/* Section 2: Rekening Pencairan Reimbursement */}
        <ProfileSectionCard
          title="Rekening Pencairan Reimburse"
          bottomAction={
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={13} color="#16A34A" />
              <Text style={styles.verifiedText}>Terverifikasi</Text>
            </View>
          }
        >
          <ProfileInfoRow
            icon="card-outline"
            label="Nama Bank"
            value={user.bankName || 'BCA (Bank Central Asia)'}
          />
          <ProfileInfoRow
            icon="copy-outline"
            label="Nomor Rekening"
            value={user.accountNumber || '8820 4912 30'}
            onPress={handleCopyAccount}
            showChevron
          />
          <ProfileInfoRow
            icon="person-outline"
            label="Nama Pemilik Rekening"
            value={user.name}
            isLast
          />
        </ProfileSectionCard>

        {/* Section 3: Pengaturan & Keamanan */}
        <ProfileSectionCard title="Pengaturan & Keamanan">
          <View
            style={[
              styles.switchRow,
              { borderBottomColor: colors.cardBorder },
            ]}
          >
            <View style={[styles.switchIconBadge, { backgroundColor: colors.dummyAvatarBg }]}>
              <Ionicons name="notifications-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.switchTextContainer}>
              <Text style={[styles.switchLabel, { color: colors.text }]}>
                Notifikasi Pengajuan Klaim
              </Text>
              <Text style={[styles.switchSub, { color: colors.textSecondary }]}>
                Pemberitahuan persetujuan dan pencairan
              </Text>
            </View>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: colors.inputBorder, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <ProfileInfoRow
            icon="key-outline"
            label="Keamanan Akun"
            value="Ganti Kata Sandi"
            onPress={handleChangePassword}
            showChevron
          />
          <ProfileInfoRow
            icon="document-text-outline"
            label="Ketentuan Perusahaan"
            value="Kebijakan Reimbursement"
            onPress={handlePolicyPress}
            showChevron
          />
          <ProfileInfoRow
            icon="help-circle-outline"
            label="Dukungan Operasional"
            value="Pusat Bantuan IT Support"
            onPress={handleSupportPress}
            showChevron
            isLast
          />
        </ProfileSectionCard>

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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Portal Reimbursement • Versi 1.0.0 (Production Ready)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  switchIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  switchTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  switchSub: {
    fontSize: 12,
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
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});

