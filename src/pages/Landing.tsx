import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Copy, Sparkles, Clock } from 'lucide-react'

const platforms = [
  { name: 'Le Bon Coin', color: '#F56B2A', users: '28M' },
  { name: 'Vinted', color: '#09B1BA', users: '23M' },
  { name: 'Marketplace', color: '#1877F2', users: '15M' },
]

const steps = [
  { icon: <Zap size={24} />, title: 'Crée ton annonce', desc: 'Remplis le formulaire une seule fois avec tes photos, ton titre et ta description.' },
  { icon: <Sparkles size={24} />, title: "L'IA optimise", desc: "Notre IA adapte ta description au style de chaque plateforme pour maximiser tes vues." },
  { icon: <Copy size={24} />, title: 'Copie & publie', desc: 'Un clic pour copier, un clic pour ouvrir la plateforme. En 30 secondes tu es en ligne partout.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center font-bold text-white text-sm">L</div>
          <span className="font-bold text-xl text-white">Listeo</span>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
        >
          Commencer gratuitement
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] mb-8">
          <Clock size={14} />
          Gagne 2h par semaine sur tes annonces
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Liste une fois,<br />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            vends partout.
          </span>
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10">
          Crée ton annonce en 2 minutes. L'IA l'optimise pour Le Bon Coin, Vinted et Facebook Marketplace. Tu copies, tu publies, c'est vendu.
        </p>
        <button
          onClick={() => navigate('/create')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 cursor-pointer shadow-lg shadow-[var(--color-primary)]/25"
        >
          Créer ma première annonce
          <ArrowRight size={20} />
        </button>
        <p className="text-sm text-[var(--color-text-muted)] mt-4">Gratuit, sans inscription — 3 annonces/mois offertes</p>

        {/* Platform badges */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-sm font-medium text-white">{p.name}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{p.users} utilisateurs</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Comment ça marche ?</h2>
        <p className="text-[var(--color-text-muted)] text-center mb-12">3 étapes, 2 minutes, 0 prise de tête.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                {step.icon}
              </div>
              <div className="text-xs font-semibold text-[var(--color-primary)] mb-2">ÉTAPE {i + 1}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain point */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-light)] border border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-4">Tu en as marre de réécrire 3 fois la même annonce ?</h2>
              <p className="text-[var(--color-text-muted)] mb-4">
                Chaque article posté sur une seule plateforme, c'est des acheteurs que tu rates.
                Mais copier-coller entre Le Bon Coin, Vinted et Marketplace, c'est 15 minutes par annonce.
              </p>
              <p className="text-[var(--color-text-muted)]">
                Avec Listeo, tu remplis UN formulaire et tu obtiens 3 annonces parfaitement optimisées
                pour chaque plateforme. L'IA adapte le style, les mots-clés et le format automatiquement.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-center">
                <div className="text-3xl font-bold text-[var(--color-lbc)]">x3</div>
                <div className="text-xs text-[var(--color-text-muted)]">Plus de visibilité</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-center">
                <div className="text-3xl font-bold text-[var(--color-secondary)]">2 min</div>
                <div className="text-xs text-[var(--color-text-muted)]">Au lieu de 20</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">0€</div>
                <div className="text-xs text-[var(--color-text-muted)]">Pour commencer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Prêt à vendre plus vite ?</h2>
        <p className="text-[var(--color-text-muted)] mb-8">Rejoins les vendeurs malins qui publient partout en un clic.</p>
        <button
          onClick={() => navigate('/create')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 cursor-pointer"
        >
          Créer mon annonce gratuitement
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6 text-center text-sm text-[var(--color-text-muted)]">
        <p>Listeo &copy; 2026 — Fait avec passion par Lihou Teboul</p>
      </footer>
    </div>
  )
}
