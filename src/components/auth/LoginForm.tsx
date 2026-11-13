import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { useLoginForm } from '../../hooks/useLoginForm';
import { DummyAccountSelector } from './DummyAccountSelector';
import { useTheme } from '../../context/ThemeContext';

export const LoginForm: React.FC = () => {
  const { colors } = useTheme();
  const {
    email,
    password,
    rememberMe,
    fieldErrors,
    isLoading,
    error,
    updateEmail,
    updatePassword,
    toggleRememberMe,
    handleLogin,
    handleSelectDummyAccount,
    handleForgotPassword,
  } = useLoginForm();

  return (
    <View>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Masuk ke Akun</Text>
      <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
        Gunakan akun resmi perusahaan Anda untuk melanjutkan
      </Text>

      {/* Error Banner */}
      {error && (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: colors.errorBackground,
              borderColor: colors.errorBorder,
            },
          ]}
        >
          <Ionicons
            name="alert-circle"
            size={20}
            color={colors.errorText}
            style={styles.errorIcon}
          />
          <Text style={[styles.errorBannerText, { color: colors.errorText }]}>{error}</Text>
        </View>
      )}

      {/* Inputs */}
      <CustomInput
        label="Alamat Email"
        placeholder="contoh: nama@perusahaan.com"
        value={email}
        onChangeText={updateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        iconName="mail-outline"
        errorMessage={fieldErrors.email}
        editable={!isLoading}
      />

      <CustomInput
        label="Kata Sandi"
        placeholder="Masukkan kata sandi akun"
        value={password}
        onChangeText={updatePassword}
        isPassword
        iconName="lock-closed-outline"
        errorMessage={fieldErrors.password}
        editable={!isLoading}
      />

      {/* Options Row */}
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={toggleRememberMe}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              { borderColor: colors.inputBorder },
              rememberMe && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
          >
            {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={[styles.rememberMeText, { color: colors.textSecondary }]}>Ingat saya</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
          <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
            Lupa kata sandi?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <CustomButton
        title="Masuk ke Akun"
        onPress={handleLogin}
        isLoading={isLoading}
        style={styles.loginButton}
      />

      {/* Quick Dummy Account Selector */}
      <DummyAccountSelector onSelectAccount={handleSelectDummyAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 18,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorIcon: {
    marginRight: 10,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 13,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 4,
  },
});
