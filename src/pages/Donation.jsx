import orangeMoneyLogo from '../assets/logo/Orange_Money-Logo.svg'
import paypalLogo     from '../assets/logo/PayPal-Logo.svg'
import etransferLogo  from '../assets/logo/e-transfer-logo.webp'
import mtnLogo        from '../assets/logo/mtn-mobile-money-logo.jpg'
import sendwaveLogo   from '../assets/logo/sendwave-logo.webp'
import waveLogo       from '../assets/logo/Wave-logo.png'

const methods = [
  {
    id: 'orange-money',
    logo: orangeMoneyLogo,
    alt: 'Orange Money',
    details: [
      { label: 'Nom du bénéficiaire', value: 'Ouattara Grâce Fatim' },
      { label: 'Numéro du compte',    value: '+225 07 59 66 78 64' },
      { label: 'Pays / Ville',        value: "Côte d'ivoire, Abidjan" },
    ],
  },
  {
    id: 'paypal',
    logo: paypalLogo,
    alt: 'PayPal',
    details: [
      { label: 'Nom du bénéficiaire', value: "N'Golu Grâce" },
      { label: 'Lien du compte',      value: 'Horloge Prophétique', link: 'https://paypal.me/HorlogeProphetique' },
    ],
  },
  {
    id: 'etransfer',
    logo: etransferLogo,
    alt: 'E-Transfer Interac',
    details: [
      { label: 'Nom du bénéficiaire', value: 'Patricia Ashley Kamde' },
      { label: 'Numéro du compte',    value: '+1(226) 582-5918' },
    ],
  },
  {
    id: 'mtn',
    logo: mtnLogo,
    alt: 'MTN Mobile Money',
    details: [
      { label: 'Nom du bénéficiaire', value: 'Ouattara Grâce Fatim' },
      { label: 'Numéro du compte',    value: '+225 05 55 62 20 29' },
      { label: 'Pays / Ville',        value: "Côte d'ivoire, Abidjan" },
    ],
  },
  {
    id: 'sendwave',
    logo: sendwaveLogo,
    alt: 'Sendwave',
    details: [
      { label: 'Nom du bénéficiaire', value: "N'Golu Grâce" },
      { label: 'Numéro du compte',    value: '+33 6 35 49 60 95' },
    ],
  },
  {
    id: 'wave',
    logo: waveLogo,
    alt: 'Wave',
    details: [
      { label: 'Nom du bénéficiaire', value: 'Koné Andréa' },
      { label: 'Numéro du compte',    value: '+225 05 55 62 20 29' },
    ],
  },
]

export default function Donation() {
  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4">

      {/* En-tête */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6">
          Faites des dons en ligne.
        </h1>
        <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
          Vous trouverez ci-dessous nos identifiants et contacts pour contribuer à la réalisation des projets à venir.
        </p>
      </div>

      {/* Grille des méthodes de paiement */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-lg">

            {/* Logo */}
            <div className="flex items-center justify-center h-16">
              <img
                src={m.logo}
                alt={m.alt}
                className="max-h-14 max-w-[180px] object-contain"
              />
            </div>

            <hr className="border-gray-200" />

            {/* Détails du compte — 2 colonnes comme sur la capture */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {m.details.map((d) => (
                <div key={d.label}>
                  <p className="text-xs font-semibold text-gray-900 underline">{d.label} :</p>
                  {d.link ? (
                    <a
                      href={d.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-0.5 block"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-xs text-gray-700 mt-0.5">{d.value}</p>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
