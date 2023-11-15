import React from 'react';
import styles from './Login.module.css';
import { useSession } from "next-auth/react"
// import { signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import { providers, signIn, getSession, csrfToken } from "next-auth/react";





export default function LoginComponent() {


    const { data: session, status } = useSession()
    console.log(session, status);
    const router = useRouter();

  return (
    <div className={styles.loginPage}>
        <div className={styles.loginCard}>
            <div className={styles.logoContainer}>
                <img src='/Assets/Images/img/frontpage/onlyLogo1.png' alt="logo" />
                <p>PrepKnight</p>
            </div>

            <p className={styles.text}>Login to prepknight to continue</p>

            <div className={styles.methods}>
                
                <a onClick={() => {
                    // signIn("google")
                    }}>
                    <img src='../../Assets/LoginPageImages/google.png' alt="google icon" />
                    <p onClick={()=>{signIn('google')}}>Continue with Google</p>
                </a>
                {/* <a href= {`${serverUrl}facebook`}>
                    <img src='../../Assets/LoginPageImages/facebook.png' alt="google icon" />
                    <p>Continue with Facebook</p>
                </a> */}
            </div>

        </div>
    </div>
  )
}
