import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { DummyAccount } from '../constants/dummyData';

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const useLoginForm = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({});

  const validateForm = (): boolean => {
    const errors: LoginFormErrors = {};

    if (!email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Format email tidak valid';
    }

    if (!password) {
      errors.password = 'Kata sandi wajib diisi';
    } else if (password.length < 6) {
      errors.password = 'Kata sandi minimal 6 karakter';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    clearError();
    if (!validateForm()) return;

    try {
      await login({
        email: email.trim(),
        password,
        rememberMe,
      });
      router.replace('/home');
    } catch {
      // Error state is managed globally by AuthContext
    }
  };

  const handleSelectDummyAccount = useCallback(
    (account: DummyAccount) => {
      setEmail(account.credentials.email);
      setPassword(account.credentials.password);
      setFieldErrors({});
      clearError();
    },
    [clearError]
  );

  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      'Lupa Kata Sandi',
      'Untuk mereset kata sandi, silakan hubungi tim IT Administrator perusahaan di support@perusahaan.com.',
      [{ text: 'OK' }]
    );
  }, []);

  const updateEmail = useCallback((text: string) => {
    setEmail(text);
    setFieldErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
  }, []);

  const updatePassword = useCallback((text: string) => {
    setPassword(text);
    setFieldErrors((prev) => (prev.password ? { ...prev, password: undefined } : prev));
  }, []);

  const toggleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  return {
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
    clearError,
  };
};
