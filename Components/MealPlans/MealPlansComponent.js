import React, {useState, useEffect, useRef} from 'react'
import styles from '../Excercises/Excercises.module.css'
import styles2 from './MealPlans.module.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';


axios.defaults.withCredentials = true

export default function MealPlansComponent() {

  const router = useRouter();

  const planName = useRef();

  const [mealPlans, setmealPlans] = useState(null)

  async function createMealPlan(){
    console.log('create meal plan')
    
    console.log(planName.current.value);
    const response = await axios.get('api/createMealPlan', {params: {planName: planName.current.value}});
    console.log(response)
    window.location.reload();
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

  const deleteMealPlan =async (id)=>{
    await axios.get('/api/deleteMealPlan', {params: {id: id}})
    window.location.reload();
  }

  useEffect(()=>{
    getMealPlans();
  }, [])


  if(!mealPlans)return

  return (
    <div className={`${styles.page} ${styles2.page}`}>

    


    <h1 className='text-main'>Meal Plans</h1>

    <div className={styles.boxes}>
      {
        mealPlans.map((elem,index)=>{
          return (
            <div className={styles.box2}>
              <p>{index}</p>
              <h4>{elem.name}</h4>
              <Button variant="primary" onClick={()=>{router.push('/MealPlans/' + elem._id)}}>View Detials</Button>
              <Button variant="danger" onClick={()=>{deleteMealPlan(elem._id)}}>Delete</Button>
            </div>
          )
        })
      }
    </div>

    <div className={styles2.create}>
      <h1 className='text-main'>Create a New Meal Plan</h1>
      <Form.Control type="text" placeholder="Normal text" ref={planName}/>
        <Button variant="primary" onClick={createMealPlan}>Create</Button>

    </div>

  </div>
  )
}
