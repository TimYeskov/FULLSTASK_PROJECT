'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react'
import { ShoppingCart, User, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Header() {

  return (
    <Box
      as="header"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom="1px"
      borderColor="coffee.200"
    >
      <Container maxW="container.xl">
        <Flex
          justify="space-between"
          align="center"
          py={4}
          gap={4}
        >
          {/* Logo */}
          <Link href="/">
            <Heading
              size="lg"
              color="coffee.700"
              cursor="pointer"
              _hover={{ color: 'coffee.500' }}
              transition="color 0.2s"
            >
              ☕ Coffee Shop
            </Heading>
          </Link>

          {/* Navigation */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            <Link href="/">
              <Button variant="ghost" colorScheme="coffee">
                Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost" colorScheme="coffee">
                Catalog
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" colorScheme="coffee">
                About
              </Button>
            </Link>
          </HStack>

          {/* Right section */}
          <HStack spacing={4}>
            {/* Profile */}
            <IconButton
              aria-label="Profile"
              icon={<User size={20} />}
              variant="ghost"
              colorScheme="coffee"
              size="lg"
            />

            {/* Cart */}
            <Link href="/cart">
              <Box position="relative">
                <IconButton
                  aria-label="Cart"
                  icon={<ShoppingCart size={20} />}
                  variant="ghost"
                  colorScheme="coffee"
                  size="lg"
                />
                {/* {totalItems > 0 && */}
                
                    {/* ( */}
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="brand"
                    borderRadius="full"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                  >
                    {0}
                  </Badge>
                {/* )} */}
              </Box>
            </Link>

            {/* Mobile menu */}
            <IconButton
              aria-label="Menu"
              icon={<Menu size={20} />}
              variant="ghost"
              colorScheme="coffee"
              size="lg"
              display={{ base: 'flex', md: 'none' }}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}