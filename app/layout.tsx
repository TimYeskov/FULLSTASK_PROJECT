import { Providers } from './providers'
import TopLoader from 'nextjs-toploader'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Coffee Shop - Best Coffee',
  description: 'Premium coffee store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <TopLoader
          color="#e68900"
          height={3}
          showSpinner={false}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

