import { PrismaClient } from '@prisma/client'

let _prisma: PrismaClient | null = null

export function useDb(): PrismaClient {
  if (!_prisma) {
    _prisma = new PrismaClient()
    // Trigger seed or connection if needed, though Prisma connects lazily
    initDb(_prisma).catch(console.error)
  }
  return _prisma
}

async function initDb(prisma: PrismaClient) {
  // Seed default settings if not present
  const adminEmail = await prisma.setting.findUnique({ where: { key: 'contact_email' } })
  if (!adminEmail) {
    await prisma.setting.createMany({
      data: [
        { key: 'contact_email', value: 'info@amawater.com' },
        { key: 'map_lat', value: '-15.4167' },
        { key: 'map_lng', value: '28.2833' },
        { key: 'map_address', value: 'Plot 491A Parkview Estates Chalala, Lusaka, Zambia' },
        { key: 'contact_phone', value: '+260979148661, +260978980065' },
        { key: 'business_hours', value: 'Mon–Fri: 08:00 – 17:00' },
        { key: 'quality_quote', value: 'Our water undergoes rigorous multi-stage filtration including Reverse Osmosis, Carbon Filtration, and UV Treatment to meet ZABS standards.' },
      ]
    })
  }

  // Seed default products if table is empty
  const productCount = await prisma.product.count()
  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        { name: 'AMA Still', slug: 'ama-still', size: '500ml · 1L · 5L', description: 'Our signature still mineral water — smooth, clean, and naturally balanced with essential minerals.', price: 12.99, category: 'still', icon: 'lucide:glass-water' },
        { name: 'AMA Sparkling', slug: 'ama-sparkling', size: '330ml · 750ml', description: 'Lightly carbonated for a refreshing twist. Perfect for dining and celebrations.', price: 15.99, category: 'sparkling', icon: 'lucide:sparkles' },
        { name: 'AMA Active', slug: 'ama-active', size: '750ml Sports Cap', description: 'Enhanced with electrolytes for active lifestyles. Stay hydrated, stay ahead.', price: 18.99, category: 'active', icon: 'lucide:dumbbell' },
      ]
    })
  }

  // Seed default water quality if table is empty
  const qualityCount = await prisma.waterQuality.count()
  if (qualityCount === 0) {
    await prisma.waterQuality.createMany({
      data: [
        { label: 'Acidity Level', value: '7.2', unit: 'pH', subtitle: 'Perfectly Balanced', icon: 'lucide:flask-conical', sort_order: 1 },
        { label: 'Calcium', value: '32', unit: 'mg/L', subtitle: 'Essential Mineral', icon: 'lucide:shield-check', sort_order: 2 },
        { label: 'Magnesium', value: '12', unit: 'mg/L', subtitle: 'Natural Vitality', icon: 'lucide:zap', sort_order: 3 },
      ]
    })
  }
}
