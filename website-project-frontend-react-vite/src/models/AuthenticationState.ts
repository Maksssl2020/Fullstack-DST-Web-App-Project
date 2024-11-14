export interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
}
