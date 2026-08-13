/**
 * useAuth — authentication hook (architecture placeholder).
 *
 * Planned return values:
 * - user, isAuthenticated, isLoading
 * - login(), logout(), register()
 *
 * Will consume AuthContext once authentication is implemented.
 */
export default function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
  }
}
