import React, {useState, useEffect} from 'react'
import styles from '../Excercises/Excercises.module.css'
import styles2 from './MealPlans.module.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

axios.defaults.withCredentials = true

export default function MealPlansComponent() {

  const router = useRouter();

  const [mealPlans, setmealPlans] = useState(null)

  async function createMealPlan(){
    window.location.reload();
    console.log('create meal plan')
    const response = await axios.get('api/createMealPlan');
    console.log(response)
  }

  const getMealPlans = async function () {

    try {
      const response = await axios.get('api/getMealPlans');
      setmealPlans(response.data)
      console.log(response.data)
    }
    catch (e) {
    }
  }

  useEffect(()=>{
    getMealPlans();
  }, [])


  if(!mealPlans)return

  return (
    <div className={styles.page}>

    


    <h1 className='text-main'>Meal Plans</h1>

    <div className={styles.boxes}>
      {
        mealPlans.map((elem,index)=>{
          return (
            <div className={styles.box} onClick={()=>{router.push('/MealPlans/' + elem._id)}}>
              <p>{index}</p>
            </div>
          )
        })
      }
    </div>

    <div className={styles2.create}>

      <Button variant="primary" onClick={createMealPlan}>Create</Button>

    </div>

  </div>
  )
}
