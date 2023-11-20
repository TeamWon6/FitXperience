import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Home from '../../Components/Home/home'
import HomeComponent from '@/Components/Home/home'
// import ExcercisesComponent from '@/Components/Excercises/Excercises'
import SavedExcercisesComponent from '@/Components/SavedExcercises/SavedExcercisesComponent'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <HomeComponent child={<SavedExcercisesComponent/>}></HomeComponent>
    </>
  )
}
