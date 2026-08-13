import { createContext, useContext } from 'react'

/**
 * AuthContext — global authentication state (architecture placeholder).
 * Not wired into App.jsx yet; existing pages use mock data.
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const value = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
