'use client' // Error components must be Client Components
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers';
import { Box } from '@chakra-ui/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Box minH='100vh' display='flex' flexDir='column'>
            <Navbar />
            <Box bg='gray.100' flex='1' p={4}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  )
}
