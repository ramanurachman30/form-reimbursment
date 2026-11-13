import { DUMMY_ACCOUNTS } from '../constants/dummyData';
import { AuthResponse, LoginCredentials, User } from '../types/auth';

/**
 * Service autentikasi terisolasi.
 * Saat ini menggunakan dummy data dengan simulasi network latency (500ms - 1000ms).
 * Saat API backend siap, cukup ubah logika di dalam service ini atau sesuaikan
 * base URL & fetch call tanpa merubah komponen UI / AuthContext.
 */
export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

class DummyAuthService implements IAuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulasi delay request jaringan (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cleanEmail = credentials.email.trim().toLowerCase();
    const cleanPassword = credentials.password;

    const matchedAccount = DUMMY_ACCOUNTS.find(
      (acc) =>
        acc.credentials.email.toLowerCase() === cleanEmail &&
        acc.credentials.password === cleanPassword
    );

    if (!matchedAccount) {
      throw new Error(
        'Email atau kata sandi tidak cocok. Silakan periksa kembali atau gunakan akun demo.'
      );
    }

    this.currentUser = matchedAccount.user;
    this.token = `dummy-jwt-token-${matchedAccount.user.id}-${Date.now()}`;

    return {
      user: matchedAccount.user,
      token: this.token,
      expiresIn: 3600,
    };
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.currentUser = null;
    this.token = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }
}

export const authService: IAuthService = new DummyAuthService();

