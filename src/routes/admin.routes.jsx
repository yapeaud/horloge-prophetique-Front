import { AdminLayout } from '../layouts/AdminLayout.jsx'
import Dashboard from '../pages/admin/Dashboard.jsx'
import AdminPodcasts from '../pages/admin/AdminPodcasts.jsx'
import AdminPrayerRequests from '../pages/admin/AdminPrayerRequests.jsx'
import AdminPrayerTopics from '../pages/admin/AdminPrayerTopics.jsx'
import AdminBooks from '../pages/admin/AdminBooks.jsx'
import AdminNewsletter from '../pages/admin/AdminNewsletter.jsx'
import AdminDonations from '../pages/admin/AdminDonations.jsx'
import AdminTeam from '../pages/admin/AdminTeam.jsx'
import AdminMedias from '../pages/admin/AdminMedias.jsx'

/**
 * Routes d'administration au format config (compatibles useRoutes).
 * AdminLayout protège toutes les routes : il redirige vers /login
 * si l'utilisateur n'est pas connecté ou n'a pas le rôle ADMIN.
 */
export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <Dashboard /> },
      { path: '/admin/podcasts', element: <AdminPodcasts /> },
      { path: '/admin/prayer-requests', element: <AdminPrayerRequests /> },
      { path: '/admin/prayer-topics', element: <AdminPrayerTopics /> },
      { path: '/admin/books', element: <AdminBooks /> },
      { path: '/admin/newsletter', element: <AdminNewsletter /> },
      { path: '/admin/donations', element: <AdminDonations /> },
      { path: '/admin/team', element: <AdminTeam /> },
      { path: '/admin/medias', element: <AdminMedias /> },
    ],
  },
]
