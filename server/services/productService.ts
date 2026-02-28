/**
 * Product service — business logic for products.
 * Equivalent to services/product_service.go
 *
 * Currently returns static data. Replace with DB queries
 * once a database is connected.
 */
export interface Product {
  id: string
  name: string
  slug: string
  size: string
  description: string
  price: number
  category: 'still' | 'sparkling' | 'active'
  inStock: boolean
}

const productData: Product[] = [
  {
    id: '1',
    name: 'AMA Still',
    slug: 'ama-still',
    size: '500ml · 1L · 5L',
    description: 'Our signature still mineral water — smooth, clean, and naturally balanced with essential minerals.',
    price: 12.99,
    category: 'still',
    inStock: true,
  },
  {
    id: '2',
    name: 'AMA Sparkling',
    slug: 'ama-sparkling',
    size: '330ml · 750ml',
    description: 'Lightly carbonated for a refreshing twist. Perfect for dining and celebrations.',
    price: 15.99,
    category: 'sparkling',
    inStock: true,
  },
  {
    id: '3',
    name: 'AMA Active',
    slug: 'ama-active',
    size: '750ml Sports Cap',
    description: 'Enhanced with electrolytes for active lifestyles. Stay hydrated, stay ahead.',
    price: 18.99,
    category: 'active',
    inStock: true,
  },
]

export function getAllProducts(): Product[] {
  return productData
}

export function getProductBySlug(slug: string): Product | undefined {
  return productData.find((p) => p.slug === slug)
}
