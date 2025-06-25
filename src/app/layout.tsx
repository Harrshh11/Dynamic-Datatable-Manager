import './globals.css'
import { ReduxProvider } from './providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DataTable App',
  description: 'Internship Task',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
