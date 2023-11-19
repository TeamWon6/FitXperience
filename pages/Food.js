import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeComponent from '@/Components/Home/home'
import FoodItems from '@/Components/FoodItems/FoodItems'

export default function Home() {
  return (
    <>
     <HomeComponent child={<FoodItems/>}></HomeComponent>
    </>
  )
}
