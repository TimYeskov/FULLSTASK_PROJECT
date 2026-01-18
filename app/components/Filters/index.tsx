'use client'

import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  HStack,
  Button,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FilterParams } from '@/types'

// Temporary ingredient data (will be from API later)
const mockIngredients = [
  { id: '1', name: 'Milk' },
  { id: '2', name: 'Cream' },
  { id: '3', name: 'Syrup' },
  { id: '4', name: 'Chocolate' },
  { id: '5', name: 'Caramel' },
  { id: '6', name: 'Vanilla' },
]

interface FiltersProps {
  onFilterChange?: (filters: FilterParams) => void
  initialFilters?: FilterParams
}

export default function Filters({
  onFilterChange,
  initialFilters,
}: FiltersProps) {
  const [search, setSearch] = useState(initialFilters?.search || '')
  const [priceRange, setPriceRange] = useState([
    initialFilters?.minPrice || 0,
    initialFilters?.maxPrice || 1000,
  ])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    initialFilters?.ingredients || []
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange?.({
      search: value,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      ingredients: selectedIngredients,
    })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    onFilterChange?.({
      search,
      minPrice: values[0],
      maxPrice: values[1],
      ingredients: selectedIngredients,
    })
  }

  const handleIngredientToggle = (ingredientId: string) => {
    const newIngredients = selectedIngredients.includes(ingredientId)
      ? selectedIngredients.filter(id => id !== ingredientId)
      : [...selectedIngredients, ingredientId]
    
    setSelectedIngredients(newIngredients)
    onFilterChange?.({
      search,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      ingredients: newIngredients,
    })
  }

  const handleReset = () => {
    setSearch('')
    setPriceRange([0, 1000])
    setSelectedIngredients([])
    onFilterChange?.({
      search: '',
      minPrice: 0,
      maxPrice: 1000,
      ingredients: [],
    })
  }

  return (
    <Box
      w={{ base: 'full', md: '300px' }}
      bg="white"
      p={6}
      borderRight={{ base: 'none', md: '1px' }}
      borderColor="coffee.200"
      minH="calc(100vh - 200px)"
    >
      <VStack spacing={6} align="stretch">
        <Heading size="md" color="coffee.700" mb={2}>
          Filters
        </Heading>

        {/* Search */}
        <Box>
          <Text mb={2} fontWeight="semibold" color="coffee.700" fontSize="sm">
            Search
          </Text>
          <Input
            placeholder="Find coffee..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            bg="coffee.50"
            borderColor="coffee.300"
            size="sm"
            _focus={{
              borderColor: 'coffee.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-coffee-500)',
            }}
          />
        </Box>

        {/* Price */}
        <Box>
          <Text mb={2} fontWeight="semibold" color="coffee.700" fontSize="sm">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </Text>
          <RangeSlider
            value={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={1000}
            step={50}
            colorScheme="brand"
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>

        {/* Ingredients */}
        <Box>
          <Text mb={3} fontWeight="semibold" color="coffee.700" fontSize="sm">
            Ingredients
          </Text>
          <CheckboxGroup colorScheme="brand">
            <VStack align="stretch" spacing={2}>
              {mockIngredients.map((ingredient) => (
                <Checkbox
                  key={ingredient.id}
                  isChecked={selectedIngredients.includes(ingredient.id)}
                  onChange={() => handleIngredientToggle(ingredient.id)}
                  colorScheme="brand"
                  size="sm"
                >
                  {ingredient.name}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
        </Box>

        {/* Reset button */}
        <Button
          onClick={handleReset}
          colorScheme="coffee"
          variant="outline"
          size="sm"
          mt={2}
        >
          Reset Filters
        </Button>
      </VStack>
    </Box>
  )
}