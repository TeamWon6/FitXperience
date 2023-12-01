import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Home from '../../Components/Home/home'
import HomeComponent from '@/Components/Home/home'
import MealPlansComponent from '@/Components/MealPlans/MealPlansComponent'

export default function Home() {
  return (
    <>
     <HomeComponent child={<MealPlansComponent/>}></HomeComponent>
    </>
  )
}
