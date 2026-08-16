import { createContext, useContext, useState } from 'react'
import api from '../api/axios.js'

const AuthContext = createContext(null)

/**
 * Fournisseur du contexte d'authentification.
 * Expose l'état de l'utilisateur connecté et les actions login/logout à toute l'application.
 */
export const AuthProvider = ({ children }) => {
  // Initialiseurs lazy : lus une seule fois au montage depuis le localStorage.
  // Permet de restaurer la session après un rechargement de page.
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  /**
   * Connecte l'utilisateur : appelle l'API, stocke le token et l'utilisateur
   * dans le localStorage (persistance) et dans le state React (réactivité).
   */
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
    return data
  }

  /**
   * Déconnecte l'utilisateur : supprime le token et les données du localStorage
   * puis réinitialise le state React (provoque une redirection via les routes protégées).
   */
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    // isAdmin est un raccourci calculé pour éviter de répéter user?.role === 'ADMIN' partout
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook personnalisé pour accéder au contexte d'authentification.
 * Lance une erreur explicite si utilisé hors de AuthProvider.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
