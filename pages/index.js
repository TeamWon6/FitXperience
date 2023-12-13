import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeComponent from '../Components/Home/home'
import LandingPageComponent from '@/Components/LandingPageComponent/LandingPageComponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <LandingPageComponent></LandingPageComponent>
    </>
  )
}
