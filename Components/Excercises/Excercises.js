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

  const getExcercises = async function () {

    try {
      const response = await axios.get('api/getExcercises' ,{ params: { page: currentPage } });
      setexcercises(response.data)
    }
    catch (e) {
    }
  }
  const getSavedExcercises = async function () {
    console.log('getting saved data');
    try {
      const response = await axios.get('api/getSavedExcercises');
      let arr = [];
      response.data.forEach(elem=>{
        arr.push(elem.id);
      })
      setsavedExcercises(arr);
    }
    catch (e) {
    }
  }

  useEffect(() => { getExcercises(); getSavedExcercises() }, [])

  useEffect(() => { 
    getExcercises();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

}, [currentPage])




  return (
    <div className={styles.page}>
      <h1 className='text-main'>Excercises</h1>

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
          <Pagination.Item onClick={nextPage}>{currentPage + 2}</Pagination.Item> 
        }
        <Pagination.Ellipsis /> 
        <Pagination.Next onClick={nextPage}/> 
      </Pagination> 
      </div>

    </div>
  )
}
