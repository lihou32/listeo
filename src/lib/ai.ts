// AI description generator using Gemini Flash-Lite (cheapest: $0.08/$0.30 per 1M tokens)
// For MVP we use client-side generation with templates + later plug in Gemini via Edge Function

interface ListingData {
  title: string
  description: string
  price: string
  category: string
  condition: string
  brand: string
  size: string
}

export interface PlatformResult {
  name: string
  color: string
  url: string
  description: string
  tips: string[]
}

export function generateDescriptions(data: ListingData): PlatformResult[] {
  const { title, description, price, condition, brand, size, category } = data
  const brandStr = brand ? ` ${brand}` : ''
  const sizeStr = size ? ` — Taille ${size}` : ''
  const condStr = condition || ''

  // Smart keyword generation
  const keywords = [category, brand, condition].filter(Boolean).join(' • ')

  return [
    {
      name: 'Le Bon Coin',
      color: '#F56B2A',
      url: 'https://www.leboncoin.fr/deposer-une-annonce',
      description: [
        `${title}${condStr ? ` — ${condStr}` : ''}${sizeStr}`,
        '',
        description,
        '',
        brand && `Marque : ${brand}`,
        condition && `État : ${condition}`,
        size && `Taille / Dimensions : ${size}`,
        category && `Catégorie : ${category}`,
        '',
        `Prix : ${price}€ — Prix ferme`,
        '',
        `Envoi possible • Remise en main propre`,
        `N'hésitez pas à me contacter pour plus d'informations.`,
      ].filter(Boolean).join('\n'),
      tips: [
        'Les annonces avec 5+ photos se vendent 40% plus vite',
        'Réponds en moins de 30 min pour remonter dans les résultats',
        'Ajoute ta localisation précise pour attirer les acheteurs proches',
      ],
    },
    {
      name: 'Vinted',
      color: '#09B1BA',
      url: 'https://www.vinted.fr/items/new',
      description: [
        `${title}${brandStr}${sizeStr}`,
        '',
        description,
        '',
        condStr && `✨ ${condStr}`,
        size && `📏 Taille : ${size}`,
        brand && `🏷️ Marque : ${brand}`,
        '',
        `💰 ${price}€`,
        '',
        '📦 Envoi rapide avec protection Vinted',
        '💬 N\'hésite pas à me faire une offre !',
        '',
        // Hashtags
        [
          category && `#${category.replace(/[& ]/g, '').toLowerCase()}`,
          brand && `#${brand.toLowerCase().replace(/\s+/g, '')}`,
          '#vendsvite',
          '#bonplan',
          '#secondemain',
          '#modesecondhand',
        ].filter(Boolean).join(' '),
      ].filter(Boolean).join('\n'),
      tips: [
        'Modifie ton annonce chaque jour pour la remonter gratuitement',
        'Les hashtags pertinents doublent ta visibilité',
        'Active "Acheter" pour rassurer les acheteurs',
        'Propose des réductions sur les lots',
      ],
    },
    {
      name: 'Facebook Marketplace',
      color: '#1877F2',
      url: 'https://www.facebook.com/marketplace/create/item/',
      description: [
        `${title} — ${price}€ 🔥`,
        '',
        `Salut ! Je vends ${title.toLowerCase()}${brandStr}.`,
        '',
        description,
        '',
        condition && `➡️ État : ${condition}`,
        size && `➡️ Taille : ${size}`,
        brand && `➡️ Marque : ${brand}`,
        '',
        `💰 Prix : ${price}€`,
        `📍 Remise en main propre ou envoi possible`,
        `📩 Envoie-moi un message si intéressé(e) !`,
        '',
        keywords && `🔖 ${keywords}`,
      ].filter(Boolean).join('\n'),
      tips: [
        'Le ton conversationnel fonctionne mieux sur Marketplace',
        'Partage dans les groupes de vente de ta ville pour x10 la portée',
        'Les emojis augmentent le taux de clic de 25%',
        'Renouvelle ton annonce chaque semaine',
      ],
    },
  ]
}
