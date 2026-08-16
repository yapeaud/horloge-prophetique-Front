import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Clock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'

/**
 * Page de connexion réservée à l'administration.
 * Si un admin est déjà connecté, redirige directement vers /admin.
 * Après authentification réussie, redirige vers /admin.
 */
export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  // Évite d'afficher la page si l'admin est déjà connecté.
  if (user?.role === 'ADMIN') return <Navigate to="/admin" replace />

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(form.email, form.password)
      navigate('/admin')
    } catch (err) {
      // Message générique pour ne pas divulguer si l'email existe ou non (anti-énumération).
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold text-xl mb-2">
            <Clock size={24} />
            Horloge Prophétique
          </div>
          <p className="text-white/40 text-sm">Espace administrateur</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="admin@horlogeprophetique.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm text-white/70">Mot de passe</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 focus:outline-none rounded-lg px-4 py-2.5 pr-11 text-white placeholder-white/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
