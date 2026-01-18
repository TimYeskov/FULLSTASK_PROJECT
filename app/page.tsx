'use client'

import { Container, Box, Flex, Heading, HStack } from '@chakra-ui/react'
import Categories from './components/Categories'
import Filters from './components/Filters'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Sort from './components/Sort'

export default function Home() {
  return (
    <Box>
      <Header />
      <Categories />
      <Box bg="coffee.50" minH="calc(100vh - 140px)">
        <Container maxW="container.xl" py={6}>
          <Flex gap={6} direction={{ base: 'column', md: 'row' }}>
            {/* Left Sidebar - Filters */}
            <Filters />

            {/* Main Content Area */}
            <Box flex={1}>
              {/* Header with Title and Sort */}
              <HStack
                justify="space-between"
                mb={6}
                align="center"
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
                gap={4}
              >
                <Heading size="lg" color="coffee.700">
                  All Coffee
                </Heading>
                <Sort />
              </HStack>

              {/* Product List */}
              <ProductList />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}