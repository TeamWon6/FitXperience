import React, { useEffect, useState } from 'react'
// import styles from './Excercises.module.css'
import styles from './Excercises.module.css'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";


axios.defaults.withCredentials = true;


export default function ExcercisesComponent() {


 

  const [excercises, setexcercises] = useState([])
  const [savedExcercises, setsavedExcercises] = useState([])

  console.log(savedExcercises)

  async function saveExcercise(id){

        axios.get('api/saveExcercise?id=' + id);

    let index = savedExcercises.indexOf(id);
    if(index == -1){
      setsavedExcercises([...savedExcercises, id]);
      return
    }
    let newArr = savedExcercises
    newArr.splice(index,1)
    setexcercises(newArr)

  }


  if(!excercises || !savedExcercises)return;


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
      setexcercises(response.data)
    }
    catch (e) {
    }
  }
  const getSavedExcercises = async function () {

    try {
      const response = await axios.get('api/getSavedExcercises');
      console.log(response);
      let arr = [];
      response.data.forEach(elem=>{
        console.log(elem);
        arr.push(elem.id);
      })
      setsavedExcercises(arr);
    }
    catch (e) {
    }
  }

  useEffect(() => { getExcercises(); getSavedExcercises() }, [])




  return (
    <div className={styles.page}>
      <h1 className='text-main'>Excercises</h1>

      <div className={styles.boxes}>
        {
          excercises.slice(currentPage * perPage, (currentPage * perPage)+ perPage).map(item => {
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
