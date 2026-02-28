/**
 * Composable for product-related operations.
 * Equivalent to a "service" in a traditional backend structure.
 */
export const useProducts = () => {
  const products = useState<any[]>('products', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch('/api/products')
      products.value = data as any[]
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
