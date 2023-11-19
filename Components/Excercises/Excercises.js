import React, { useEffect, useState } from 'react'
// import styles from './Excercises.module.css'
import styles from './Excercises.module.css'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';
import { AiOutlineStar } from "react-icons/ai";



export default function ExcercisesComponent() {

  
  

  const [excercises, setexcercises] = useState([])

  if(!excercises)return;


  const [currentPage, setcurrentPage] = useState(0)

  const perPage = 8;

  
  const nextPage = function(){
    if(((currentPage + 1) * perPage >= excercises.length)){
      return;
    }
    setcurrentPage(prev=>prev+1)
  }
  const prevPage = function(){
    if(currentPage == 0){
      return;
    }
    setcurrentPage(prev=>prev-1)
  }

  const getExcercises = async function () {

    try {
      const response = await axios.get('api/getExcercises');
      console.log(response);
      setexcercises(response.data)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { getExcercises() }, [])

  function capitalizeFirstLetter(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }


  return (
    <div className={styles.page}>
      <h1 className='text-main'>Exercises</h1>

      <div className={styles.boxes}>
        {
          excercises.slice(currentPage * perPage, (currentPage * perPage)+ perPage).map(item => {
            return (
              <div className={styles.box}>
                <img src={item.gifUrl} alt="" />
                <div className={styles.body}>
                  <h3 className='text-dark'>{capitalizeFirstLetter(item.name)}</h3>
                  <p>Target: {item.target}</p>

                  <div className={styles.save}>
                    <AiOutlineStar size='24px' className='text-main'/>
                    <p className='text-main'>Save</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      
      <div className={styles.pagination}>

      <Pagination> 
        <Pagination.Prev onClick={prevPage}/> 
        <Pagination.Ellipsis />

        {
          currentPage == 0?
          <></>
          :
          <Pagination.Item onClick={prevPage}>{currentPage}</Pagination.Item>
        }
        <Pagination.Item active>{currentPage + 1}</Pagination.Item> 

        {
          (currentPage + 1)*perPage >= excercises.length?
          <></>
          :
          <Pagination.Item onClick={nextPage}>{currentPage + 2}</Pagination.Item> 
        }
        <Pagination.Ellipsis /> 
        <Pagination.Next onClick={nextPage}/> 
      </Pagination> 
      </div>

    </div>
  )
}
