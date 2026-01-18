'use client'

import {
  HStack,
  Text,
  Select,
} from '@chakra-ui/react'
import { useState } from 'react'

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

interface SortProps {
  onSortChange?: (sort: SortOption) => void
}

export default function Sort({ onSortChange }: SortProps) {
  const [sortValue, setSortValue] = useState<SortOption>('popular')

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption
    setSortValue(value)
    onSortChange?.(value)
  }

  return (
    <HStack spacing={2}>
      <Text fontSize="sm" color="coffee.700" fontWeight="medium">
        Sort by:
      </Text>
      <Select
        value={sortValue}
        onChange={handleSortChange}
        size="sm"
        w="200px"
        bg="white"
        borderColor="coffee.300"
        _focus={{
          borderColor: 'coffee.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-coffee-500)',
        }}
      >
        <option value="popular">Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </Select>
    </HStack>
  )
}

