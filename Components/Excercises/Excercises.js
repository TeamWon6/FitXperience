import React, { useEffect, useState } from 'react'
// import styles from './Excercises.module.css'
import styles from './Excercises.module.css'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";



axios.defaults.withCredentials = true;


export default function ExcercisesComponent() {


 

  const [excercises, setexcercises] = useState([])
  const [savedExcercises, setsavedExcercises] = useState([])
  
  const [selectedExcercise, setselectedExcercise] = useState(null)



  async function saveExcercise(id){
    try{

      await axios.get('api/saveExcercise?id=' + id);
    }
    catch(e){

    }

    let index = savedExcercises.indexOf(id);
    if(index == -1){
      setsavedExcercises([...savedExcercises, id]);
      return
    }


    let newArr = savedExcercises
    newArr.splice(index,1)


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

  useEffect(() => { getExcercises();}, [])

  useEffect(() => { 
    getExcercises();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

}, [currentPage])


function viewDetails(item){
  setselectedExcercise(item);
}

  return (



    <div className={styles.page}>

      {
selectedExcercise  &&
        <div className={`overlay ${styles.overlay} ${selectedExcercise?'': styles.close}`}>
        <div className={styles.popup}>
            <h3>{selectedExcercise.name}</h3>
            <IoIosClose className={styles.close} size={'32px'} onClick={()=>{setselectedExcercise(null)}}/>
            <img src={selectedExcercise.gifUrl} alt="" />
            <p>Target Muscle: {selectedExcercise.target}</p>
            <h4>Instructions</h4>
            {
              selectedExcercise.instructions.map(elem=>{
                return(
                  <p>{elem}</p>
                )
              })
            }
        </div>
      </div>
      }


      <h1 className='text-main'>Excercises</h1>

      <div className={styles.boxes}>
        {
          excercises.map(item => {
            return (
              <div className={styles.box} onClick={()=>{viewDetails(item)}}>
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
