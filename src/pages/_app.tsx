import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>trbritt | portfolio</title>
          <meta name="description" content="A collection of my experience, education, and projects" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

          {/* Added meta tags for better SEO and social sharing */}
          <meta property="og:title" content="Tristan Britt | Terminal Portfolio" />
          <meta property="og:description" content="A terminal-inspired portfolio website showcasing the projects and skills of Tristan Britt" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tbritt.xyz" />
          <meta property="og:image" content="https://tbritt.xyz/headshot.png" />

          {/* Color theme for browser UI */}
          <meta name="theme-color" content="#111111" />
        </Head>
        <Component {...pageProps} />
      </>
  )
}
