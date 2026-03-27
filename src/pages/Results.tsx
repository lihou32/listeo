import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink, Plus, Sparkles } from 'lucide-react'
import { generateDescriptions, type PlatformResult } from '../lib/ai'

interface ListingForm {
  title: string
  description: string
  price: string
  category: string
  condition: string
  brand: string
  size: string
}

export default function Results() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState<string | null>(null)

  const form: ListingForm | null = useMemo(() => {
    const raw = sessionStorage.getItem('listeo_form')
    return raw ? JSON.parse(raw) : null
  }, [])

  const results: PlatformResult[] = useMemo(() => form ? generateDescriptions(form) : [], [form])

  useEffect(() => {
    if (!form) navigate('/create')
  }, [form, navigate])

  const handleCopy = async (platform: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(platform)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!form) return null

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/create')} className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer">
            <ArrowLeft size={20} className="text-[var(--color-text-muted)]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center font-bold text-white text-sm">L</div>
            <span className="font-bold text-xl text-white">Listeo</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Nouvelle annonce
        </button>
      </nav>

      {/* Results header */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-3xl font-bold text-white">Tes annonces sont prêtes !</h1>
        </div>
        <p className="text-[var(--color-text-muted)] mb-8">
          Copie chaque version et publie-la sur la plateforme correspondante.
        </p>

        {/* Summary */}
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-8 flex items-center gap-6 flex-wrap">
          <div>
            <span className="text-xs text-[var(--color-text-muted)]">Article</span>
            <p className="text-white font-medium">{form.title}</p>
          </div>
          <div>
            <span className="text-xs text-[var(--color-text-muted)]">Prix</span>
            <p className="text-white font-medium">{form.price}€</p>
          </div>
          {form.category && (
            <div>
              <span className="text-xs text-[var(--color-text-muted)]">Catégorie</span>
              <p className="text-white font-medium">{form.category}</p>
            </div>
          )}
          {form.condition && (
            <div>
              <span className="text-xs text-[var(--color-text-muted)]">État</span>
              <p className="text-white font-medium">{form.condition}</p>
            </div>
          )}
        </div>

        {/* Platform cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {results.map((platform) => (
            <div
              key={platform.name}
              className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-opacity-50 transition-colors"
              style={{ borderTopColor: platform.color, borderTopWidth: '3px' }}
            >
              {/* Platform header */}
              <div className="p-5 border-b border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                    <h3 className="font-semibold text-white">{platform.name}</h3>
                  </div>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                    style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                  >
                    Ouvrir
                    <ExternalLink size={12} />
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(platform.name, platform.description)}
                  className="w-full py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: copied === platform.name ? '#00B89420' : `${platform.color}15`,
                    color: copied === platform.name ? '#00B894' : platform.color,
                    border: `1px solid ${copied === platform.name ? '#00B89440' : `${platform.color}30`}`,
                  }}
                >
                  {copied === platform.name ? (
                    <><Check size={16} /> Copié !</>
                  ) : (
                    <><Copy size={16} /> Copier l'annonce</>
                  )}
                </button>
              </div>

              {/* Description preview */}
              <div className="p-5">
                <pre className="text-sm text-[var(--color-text-muted)] whitespace-pre-wrap font-[inherit] leading-relaxed max-h-64 overflow-y-auto">
                  {platform.description}
                </pre>
              </div>

              {/* Tips */}
              <div className="px-5 pb-5">
                <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <p className="text-xs font-semibold text-[var(--color-primary)] mb-2">💡 Astuces</p>
                  {platform.tips.map((tip, i) => (
                    <p key={i} className="text-xs text-[var(--color-text-muted)] mb-1 last:mb-0">• {tip}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
