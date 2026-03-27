import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, X, Sparkles, Loader2, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const categories = [
  'Mode & Vêtements', 'Chaussures', 'Sacs & Accessoires', 'Électronique', 'Téléphones',
  'Meubles', 'Décoration', 'Électroménager', 'Sport', 'Livres', 'Jeux & Jouets',
  'Bébé & Puériculture', 'Véhicules', 'Immobilier', 'Autre',
]

const conditions = ['Neuf avec étiquette', 'Neuf sans étiquette', 'Très bon état', 'Bon état', 'Satisfaisant']

interface ListingForm {
  title: string
  description: string
  price: string
  category: string
  condition: string
  brand: string
  size: string
  photos: string[]
}

export default function CreateListing() {
  const navigate = useNavigate()
  const { user, profile, canCreateListing, incrementListingCount } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [form, setForm] = useState<ListingForm>({
    title: '', description: '', price: '', category: '', condition: '', brand: '', size: '', photos: [],
  })

  const update = (field: keyof ListingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newPhotos = Array.from(files).map(f => URL.createObjectURL(f))
    setForm(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos].slice(0, 10) }))
  }

  const removePhoto = (index: number) => {
    setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))
  }

  const canGenerate = form.title.trim() && form.description.trim() && form.price.trim()

  const remainingListings = profile ? (profile.plan === 'pro' ? '∞' : `${3 - profile.listings_this_month}`) : '3'

  const handleGenerate = async () => {
    if (!canGenerate) return

    // Check if user is logged in
    if (!user) {
      navigate('/auth')
      return
    }

    // Check listing limit
    if (!canCreateListing()) {
      return // Will show upgrade prompt
    }

    setIsGenerating(true)

    try {
      // Save listing to Supabase
      const { error } = await supabase.from('listings').insert({
        user_id: user.id,
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category || null,
        condition: form.condition || null,
        brand: form.brand || null,
        size: form.size || null,
      })

      if (error) {
        console.error('Error saving listing:', error)
      }

      // Increment listing counter
      await incrementListingCount()

      // Store form data for results page
      sessionStorage.setItem('listeo_form', JSON.stringify(form))
      navigate('/results')
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const limitReached = user && !canCreateListing()

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer">
            <ArrowLeft size={20} className="text-[var(--color-text-muted)]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center font-bold text-white text-sm">L</div>
            <span className="font-bold text-xl text-white">Listeo</span>
          </div>
        </div>
        {user && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[var(--color-text-muted)]">Annonces restantes :</span>
            <span className="font-bold text-[var(--color-primary)]">{remainingListings}</span>
          </div>
        )}
      </nav>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Nouvelle annonce</h1>
        <p className="text-[var(--color-text-muted)] mb-8">Remplis une seule fois, on s'occupe du reste.</p>

        <div className="space-y-6">
          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Photos (max 10)</label>
            <div className="flex flex-wrap gap-3">
              {form.photos.map((photo, i) => (
                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[var(--color-border)]">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <X size={12} className="text-white" />
                  </button>
                </div>
              ))}
              {form.photos.length < 10 && (
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <Upload size={20} className="text-[var(--color-text-muted)]" />
                  <span className="text-xs text-[var(--color-text-muted)] mt-1">Ajouter</span>
                  <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Titre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Ex: Nike Air Force 1 blanches taille 42"
              className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Décris ton article : état, taille, couleur, raison de la vente..."
              rows={4}
              className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Prix <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-medium">€</span>
            </div>
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
              >
                <option value="">Choisir...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">État</label>
              <select
                value={form.condition}
                onChange={(e) => update('condition', e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
              >
                <option value="">Choisir...</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Brand & Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Marque</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => update('brand', e.target.value)}
                placeholder="Ex: Nike, IKEA, Samsung..."
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Taille</label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => update('size', e.target.value)}
                placeholder="Ex: M, 42, 160x200..."
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>

          {/* Limit reached banner */}
          {limitReached && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <Lock size={20} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-red-400 font-medium text-sm">Limite atteinte</p>
                <p className="text-red-400/70 text-sm mt-1">
                  Tu as utilisé tes 3 annonces gratuites ce mois-ci. Passe à Pro pour des annonces illimitées.
                </p>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating || !!limitReached}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 cursor-pointer
              ${canGenerate && !isGenerating && !limitReached
                ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white hover:scale-[1.02] shadow-lg shadow-[var(--color-primary)]/25'
                : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed'
              }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                L'IA optimise tes annonces...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Générer mes 3 annonces
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
