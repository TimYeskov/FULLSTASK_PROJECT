export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    categoryId: string
    category?: Category
    ingredients?: Ingredient[]
  }
  
  export interface Category {
    id: number
    name: string
    slug: string
    image?: string
  }
  
  export interface Ingredient {
    id: string
    name: string
  }
  
    // Типы для корзины
  export interface CartItem {
    product: Product
    quantity: number
  }
  

  export interface FilterParams {
    category?: string
    minPrice?: number
    maxPrice?: number
    ingredients?: string[]
    search?: string
  }