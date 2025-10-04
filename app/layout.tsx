import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {GeistMono} from "geist/font/mono"
import "./globals.css"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Nomad List - 전세계 디지털 노마드 도시 정보",
    description: "디지털 노마드와 원격근무자를 위한 도시 정보 플랫폼. 생활비, 인터넷, 날씨를 한눈에 비교하세요.",
    generator: "v0.app",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
        <body className={`font-sans ${inter.variable} ${GeistMono.variable}`}>{children}</body>
        </html>
    )
}
