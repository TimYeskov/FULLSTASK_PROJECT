'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

// Custom theme for coffee shop
const theme = extendTheme({
  colors: {
    brand: {
      50: '#fff4e6',
      100: '#ffe0b3',
      200: '#ffcc80',
      300: '#ffb84d',
      400: '#ffa31a',
      500: '#e68900', // Main accent - vibrant orange
      600: '#cc7700',
      700: '#b36600',
      800: '#995500',
      900: '#804400',
    },
    coffee: {
      50: '#f5f1eb',
      100: '#e8ddd0',
      200: '#d4c0a8',
      300: '#c0a380',
      400: '#ac8658',
      500: '#8B6F47', // Rich coffee brown
      600: '#6d5638',
      700: '#4f3d29',
      800: '#31251a',
      900: '#130c0b',
    },
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Accent red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
  fonts: {
    heading: `var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#faf8f5',
        color: '#2d2d2d',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#8B6F47',
            color: '#fff',
          },
        }}
      />
    </ChakraProvider>
  )
}

