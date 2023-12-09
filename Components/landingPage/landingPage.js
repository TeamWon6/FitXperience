import styles from './landingPage.module.css'; // Import your CSS module

import stylesTwo from '../Navbar/Navbar.module.css'
import { buttonBaseClasses } from '@mui/material';
 
import { useEffect, useState } from 'react';

import { useRouter,Link } from 'next/router';







const YourComponent = () => {

  const router = useRouter();


  const [backgroundColor, setBackgroundColor] = useState(styles.initialBackgroundColor);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newColor = scrollPosition > 100 ? styles.newBackgroundColor : styles.initialBackgroundColor;
      setBackgroundColor(newColor);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 





  

  return (

    <div className={styles.backgroundContainer}>

      <div className={styles.overlay}></div>

          <div  className={styles.whiteBox}>


           <div className={styles.content}>

          <img className={styles.imageContainer}  src='/images/logo.jpg' alt="logo" width="24%" height="24%"/>



<p className={styles.textThree}>Fit<span className={styles.textFour}>Xperience</span></p>

      </div>
<div className={styles.buttons}> 


<button className={styles.button}>
Sign up
</button>


<div className={styles.spacer}></div>

<button onClick={()=>{router.push('../../../../' + 'login')}} className={styles.button}>

Sign in

</button>


</div>
   

          </div>
      <div className={styles.textTwo}>
    BECOME FITTER, STRONGER & 
    <br></br>
    MORE CONFIDENT
      </div>



      <div class={styles.desc}>This is some small text with the 'Roboto Condensed' font-family and black color.</div>




    </div>

  );
};

export default YourComponent;
