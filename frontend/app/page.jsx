import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Feature from '../components/Feature'
import Hero from '../components/Hero'
import Testimonial from '../components/Testimonial'
import Email from '../components/Email'


const inter = Inter({ subsets: ['latin'] })

export default function HomeRoute() {
  return (
    <main>
        <Hero />
        <Feature />
        <Testimonial />
        <Email />
    </main>
  )
}

