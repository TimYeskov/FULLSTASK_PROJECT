'use client'

import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { Product, Category } from '@/types'
import { ShoppingCart } from 'lucide-react'
import { useRef, useMemo, useEffect } from 'react'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/store/category'

// Temporary category data (same as in Categories component)
const mockCategories: Category[] = [
  { id: 1, name: 'Espresso', slug: 'espresso' },
  { id: 2, name: 'Cappuccino', slug: 'cappuccino' },
  { id: 3, name: 'Latte', slug: 'latte' },
  { id: 4, name: 'Americano', slug: 'americano' },
  { id: 5, name: 'Raf Coffee', slug: 'raf' },
  { id: 6, name: 'Flat White', slug: 'flat-white' },
]

// Temporary product data (will be from API later)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Espresso',
    description: 'Rich and intense espresso with a perfect crema',
    price: 3.50,
    image: '/images/products/espresso.jpg',
    categoryId: '1',
    ingredients: [{ id: '1', name: 'Milk' }],
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 4.50,
    image: '/images/products/cappuccino.jpg',
    categoryId: '2',
    ingredients: [
      { id: '1', name: 'Milk' },
      { id: '3', name: 'Syrup' },
    ],
  },
  {
    id: '3',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk',
    price: 4.75,
    image: '/images/products/latte.jpg',
    categoryId: '3',
    ingredients: [
      { id: '1', name: 'Milk' },
      { id: '4', name: 'Chocolate' },
    ],
  },
  {
    id: '4',
    name: 'Americano',
    description: 'Espresso with hot water',
    price: 3.25,
    image: '/images/products/americano.jpg',
    categoryId: '4',
  },
  {
    id: '5',
    name: 'Raf Coffee',
    description: 'Espresso with cream and vanilla syrup',
    price: 5.00,
    image: '/images/products/raf.jpg',
    categoryId: '5',
    ingredients: [
      { id: '2', name: 'Cream' },
      { id: '6', name: 'Vanilla' },
    ],
  },
  {
    id: '6',
    name: 'Flat White',
    description: 'Double espresso with microfoam',
    price: 4.75,
    image: '/images/products/flat-white.jpg',
    categoryId: '6',
    ingredients: [{ id: '1', name: 'Milk' }],
  },
  {
    id: '7',
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.25,
    image: '/images/products/mocha.jpg',
    categoryId: '3',
    ingredients: [
      { id: '1', name: 'Milk' },
      { id: '4', name: 'Chocolate' },
      { id: '5', name: 'Caramel' },
    ],
  },
  {
    id: '8',
    name: 'Caramel Macchiato',
    description: 'Espresso with vanilla, caramel and steamed milk',
    price: 5.50,
    image: '/images/products/macchiato.jpg',
    categoryId: '3',
    ingredients: [
      { id: '1', name: 'Milk' },
      { id: '5', name: 'Caramel' },
      { id: '6', name: 'Vanilla' },
    ],
  },
]

interface ProductListProps {
  products?: Product[]
  onAddToCart?: (product: Product) => void
}

// Component for a single product card
function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart?: (product: Product) => void }) {
  const handleAddToCart = () => {
    console.log('Add to cart:', product)
    onAddToCart?.(product)
  }

  return (
    <Card
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      transition="all 0.3s"
    >
      {/* Product Image */}
      <Box
        position="relative"
        h="200px"
        bg="coffee.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="coffee.400" fontSize="4xl">
          ☕
        </Text>
      </Box>

      <CardBody>
        <VStack align="stretch" spacing={2}>
          <Heading size="md" color="coffee.700">
            {product.name}
          </Heading>
          <Text fontSize="sm" color="coffee.600" noOfLines={2}>
            {product.description}
          </Text>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <HStack spacing={1} flexWrap="wrap">
              {product.ingredients.map((ingredient) => (
                <Badge
                  key={ingredient.id}
                  colorScheme="coffee"
                  variant="subtle"
                  fontSize="xs"
                >
                  {ingredient.name}
                </Badge>
              ))}
            </HStack>
          )}
        </VStack>
      </CardBody>

      <CardFooter
        pt={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold" color="brand.600">
          ${product.price.toFixed(2)}
        </Text>
        <Button
          leftIcon={<ShoppingCart size={18} />}
          colorScheme="brand"
          size="sm"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

// Component for a category section
function CategorySection({ 
  category, 
  products, 
  onAddToCart 
}: { 
  category: Category
  products: Product[]
  onAddToCart?: (product: Product) => void 
}) {
  const { setCategoryActiveId } = useCategoryStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(sectionRef, {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px',
  })

  // Update active category when section is visible
  useEffect(() => {
    if (intersection?.isIntersecting && intersection.intersectionRatio > 0.3) {
      setCategoryActiveId(category.id)
    }
  }, [intersection?.isIntersecting, intersection?.intersectionRatio, category.id, setCategoryActiveId])

  return (
    <Box ref={sectionRef} id={`category-${category.id}`} mb={12}>
      <Heading size="lg" color="coffee.700" mb={6}>
        {category.name}
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default function ProductList({
  products = mockProducts,
  onAddToCart,
}: ProductListProps) {
  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<number, Product[]> = {}
    
    mockCategories.forEach((category) => {
      grouped[category.id] = products.filter(
        (product) => Number(product.categoryId) === category.id
      )
    })
    
    return grouped
  }, [products])

  return (
    <Box>
      {mockCategories.map((category) => {
        const categoryProducts = productsByCategory[category.id] || []
        if (categoryProducts.length === 0) return null
        
        return (
          <CategorySection
            key={category.id}
            category={category}
            products={categoryProducts}
            onAddToCart={onAddToCart}
          />
        )
      })}
    </Box>
  )
}