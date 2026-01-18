'use client'

import {
  Box,
  Container,
  HStack,
  Button,
} from '@chakra-ui/react'
import { Category } from '@/types'
import { useCategoryStore } from '@/store/category'
// Temporary category data (will be from API later)
const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Espresso',
    slug: 'espresso',
  },
  {
    id: 2,
    name: 'Cappuccino',
    slug: 'cappuccino',
  },
  {
    id: 3,
    name: 'Latte',
    slug: 'latte',
  },
  {
    id: 4,
    name: 'Americano',
    slug: 'americano',
  },
  {
    id: 5,
    name: 'Raf Coffee',
    slug: 'raf',
  },
  {
    id: 6,
    name: 'Flat White',
    slug: 'flat-white',
  },
]

export default function Categories() {
  const { categoryActiveId, setCategoryActiveId } = useCategoryStore()

  const handleCategoryClick = (categoryId: number) => {
    setCategoryActiveId(categoryId)
    // Scroll to category section
    const section = document.getElementById(`category-${categoryId}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="coffee.200"
      py={3}
      position='sticky'
      top={0}
      zIndex={1000}
    >
      <Container maxW="container.xl" >
        <HStack spacing={4} overflowX="auto" py={2} >
          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant={categoryActiveId === category.id ? 'solid' : 'ghost'}
              colorScheme={categoryActiveId === category.id ? 'brand' : 'coffee'}
              size="md"
              onClick={() => handleCategoryClick(category.id)}
              whiteSpace="nowrap"
              _hover={{
                bg: categoryActiveId === category.id ? 'brand.600' : 'coffee.100',
              }}
              transition="all 0.2s"
            >
              {category.name}
            </Button>
          ))}
        </HStack>
      </Container>
    </Box>
  )
}