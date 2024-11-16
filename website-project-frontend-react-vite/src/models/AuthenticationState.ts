export interface AuthenticationState {
  isAuthenticated: boolean;
  userId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
}
