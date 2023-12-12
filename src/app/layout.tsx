import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import ReduxCustomProvider from "@/components/providers/ReduxCustomProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Мирэа общежития',
  description: 'Система расселения по общежитиям',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ReduxCustomProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </ReduxCustomProvider>
      </body>
    </html>
  )
}
