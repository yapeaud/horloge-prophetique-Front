import { PublicLayout } from '../layouts/PublicLayout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import HRealisations from '../pages/HRealisations/HRealisations.jsx'
import Team from '../pages/Team.jsx'
import Projects from '../pages/Projects.jsx'
import Testimonials from '../pages/Testimonials.jsx'
import HMedias from '../pages/HMedias.jsx'
import Podcasts from '../pages/Podcasts.jsx'
import HInter from '../pages/HInter/HInter.jsx'
import PrayerTopics from '../pages/HInter/PrayerTopics.jsx'
import WeeklyTopics from '../pages/HInter/WeeklyTopics.jsx'
import Horlolivre from '../pages/Horlolivre/Horlolivre.jsx'
import Devotions from '../pages/Horlolivre/Devotions.jsx'
import Library from '../pages/Horlolivre/Library.jsx'
import Newsletter from '../pages/Newsletter.jsx'
import Contact from '../pages/Contact.jsx'
import Donation from '../pages/Donation.jsx'
import Login from '../pages/Login.jsx'

/**
 * Routes publiques au format config (compatibles useRoutes de React Router v6).
 *
 * Structure des sections avec hub page (même pattern) :
 *   /h-inter            → hub H-Inter
 *   /h-inter/sujets     → sujets mensuels
 *   /h-inter/hebdomadaire
 *
 *   /horlolivre         → hub Horlolivre
 *   /horlolivre/devotions
 *   /horlolivre/librairie
 *
 *   /h-realisations     → hub H-Réalisations
 *   /h-realisations/projets
 *   /h-realisations/equipe
 *   /h-realisations/temoignages
 */
export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/a-propos', element: <About /> },

      // H-Réalisations — hub + 4 sous-sections (projets, équipe, témoignages, h-médias)
      { path: '/h-realisations', element: <HRealisations /> },
      { path: '/h-realisations/projets', element: <Projects /> },
      { path: '/h-realisations/equipe', element: <Team /> },
      { path: '/h-realisations/temoignages', element: <Testimonials /> },
      { path: '/h-realisations/h-medias', element: <HMedias /> },
      { path: '/podcasts', element: <Podcasts /> },

      // H-Inter
      { path: '/h-inter', element: <HInter /> },
      { path: '/h-inter/sujets', element: <PrayerTopics /> },
      { path: '/h-inter/hebdomadaire', element: <WeeklyTopics /> },

      // Horlolivre
      { path: '/horlolivre', element: <Horlolivre /> },
      { path: '/horlolivre/devotions', element: <Devotions /> },
      { path: '/horlolivre/librairie', element: <Library /> },

      { path: '/newsletter', element: <Newsletter /> },
      { path: '/contact', element: <Contact /> },
      { path: '/donation', element: <Donation /> },
    ],
  },
  { path: '/login', element: <Login /> },
]
