import React, { useEffect, useState } from 'react'
// import styles from './Excercises.module.css'
import styles from '../Excercises/Excercises.module.css'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";


axios.defaults.withCredentials = true;


export default function SavedExcercisesComponent() {


  const [excercises, setexcercises] = useState([])
  const [savedExcercises, setsavedExcercises] = useState([])

  console.log(savedExcercises);


  async function saveExcercise(id){
    try{

      await axios.get('api/saveExcercise?id=' + id);
    }
    catch(e){

    }

    let index = savedExcercises.indexOf(id);
    if(index == -1){
      console.log('saving');
      setsavedExcercises([...savedExcercises, id]);
      return
    }

    console.log('unsaving');

    let newArr = savedExcercises
    newArr.splice(index,1)

    console.log(newArr);

    setsavedExcercises([...newArr])

  }
  
  if(!excercises || !savedExcercises)return;


  const [currentPage, setcurrentPage] = useState(0)

  const perPage = 10;

  
  const nextPage = function(){
    setcurrentPage(prev=>prev+1)
  }
  const prevPage = function(){
    if(currentPage == 0){
      return;
    }
    setcurrentPage(prev=>prev-1)
  }

 
  const getSavedExcercises = async function () {
    console.log('getting saved data');
    try {
      const response = await axios.get('api/getSavedExcercises');
      setexcercises(response.data);
      let arr = [];
      response.data.forEach(elem=>{
        arr.push(elem.id);
      })
      setsavedExcercises(arr);
    }
    catch (e) {
    }
  }

  useEffect(() => {getSavedExcercises() }, [])


  return (
    <div className={styles.page}>
      <h1 className='text-main'>Saved Excercises</h1>

      <div className={styles.boxes}>
        {
          excercises.map(item => {
            return (
              <div className={styles.box}>
                <img src={item.gifUrl} alt="" />
                <div className={styles.body}>
                  <h3 className='text-dark'>{item.name}</h3>
                  <p>Target: {item.target}</p>
                  {
                    savedExcercises.includes(item.id)?

                    <div className={styles.save} onClick={()=>{saveExcercise(item.id)}}>
                    <AiFillStar size='24px' className='text-main'/>
                    <p className='text-main'>Saved</p>
                  </div>
                    :
 
                  <div className={styles.save} onClick={()=>{saveExcercise(item.id)}}>
                    <AiOutlineStar size='24px' className='text-main'/>
                    <p className='text-main'>Save</p>
                  </div>

                  }

                </div>
              </div>
            )
          })
        }
      </div>
      
      

    </div>
  )
}
