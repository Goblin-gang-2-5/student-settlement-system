import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import ReduxCustomProvider from "@/components/providers/ReduxCustomProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import Navbar from "@/components/UI/header/Navbar";
import SessionCustomProvider from "@/components/providers/SessionProvider";
import {auth} from "@/auth";
import Header from "@/components/UI/header/Header";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Мирэа общежития',
  description: 'Система расселения по общежитиям',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="ru">
      <body className={inter.className}>
          <StyledComponentsRegistry>
            <ReduxCustomProvider>
              <ReactQueryProvider>
                <SessionCustomProvider session={session}>
                  <Header>
                    <Navbar/>
                  </Header>
                  {children}
                </SessionCustomProvider>
              </ReactQueryProvider>
            </ReduxCustomProvider>
          </StyledComponentsRegistry>
      </body>
    </html>
  )
}
