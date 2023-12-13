import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Home from '../../Components/Home/home'
import HomeComponent from '@/Components/Home/home'
// import LoginComponent from '@/Components/Login/Login'
import ProfilePage from '@/Components/ProfileComponent/profilePage'


export default function Home() {
  return (
    <>
     <HomeComponent child={<ProfilePage/>}></HomeComponent>
    </>
  )
}
