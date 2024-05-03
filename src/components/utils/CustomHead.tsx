import preview from '@public/preview.jpg'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface CustomHeadProps {
   title?: string
   description?: string
   image?: string
   url?: string
   twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player'
   keywords?: string[]
}

export default function CustomHead(props: CustomHeadProps) {
   const router = useRouter()

   const seo = {
      title: 'BlockT - A Web3 Platform To Buy Tasty Donuts',
      description:
         'My goal is to work with web3 to connect to smart contracts and send transactions on a Polygon testnet in this project and maybe buy some Donuts!',
      url: router.asPath,
      image: preview.src,
      twitterCardType: 'summary',
      keywords: ['Sina', 'Kheiri', 'BlockT', 'Web3', 'Blockchain', 'Polygon', 'Amoy'],
      ...props,
   } satisfies CustomHeadProps

   return (
      <Head>
         {/* Primary Meta Tags */}
         <meta name="viewport" content="width=device-width, height=device-height" />
         <title>{seo.title}</title>
         <meta name="title" content={seo.title} />
         <meta name="description" content={seo.description} />
         <meta name="keywords" content={seo.keywords.join(', ')} />
         <meta name="author" content="Sina Kheiri" />

         {/* Open Graph / Facebook */}
         <meta property="og:type" content="website" />
         <meta property="og:url" content={seo.url} />
         <meta property="og:title" content={seo.title} />
         <meta property="og:description" content={seo.description} />
         <meta property="og:image" content={seo.image} />

         {/* Twitter */}
         <meta property="twitter:card" content={seo.twitterCardType} />
         <meta property="twitter:url" content={seo.url} />
         <meta property="twitter:title" content={seo.title} />
         <meta property="twitter:description" content={seo.description} />
         <meta property="twitter:image" content={seo.image} />
      </Head>
   )
}
