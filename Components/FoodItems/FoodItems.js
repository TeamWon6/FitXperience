import React, { useEffect, useState } from 'react'
import styles2 from './FoodItems.module.css'
import styles from '../Excercises/Excercises.module.css'
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';



export default function FoodItems() {

    const [food, setfood] = useState(null)

    const [currentPage, setcurrentPage] = useState(0)

    const perPage = 8;


    const nextPage = function () {
        if (((currentPage + 1) * perPage >= food.totalProducts)) {
            return;
        }
        setcurrentPage(prev => prev + 1)
    }
    const prevPage = function () {
        if (currentPage == 0) {
            return;
        }
        setcurrentPage(prev => prev - 1)
    }

    const getFood = async function () {

        console.log('getting food');

        const response = await axios.get('api/getFoodData', { params: { page: currentPage } });
        console.log(response);
        setfood(response.data);

    }

    useEffect(() => { getFood() }, [])
    useEffect(() => { 
        getFood();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  
    }, [currentPage])

    console.log(food)

    if (!food) return;

    return (
        <div className={styles.page}>
            <h1 className='text-main'>Food Items</h1>

            <div className={styles2.search}>
                <input type="text" />
                <IoIosSearch size={'32px'} className='text-main' />
            </div>

            <div className={styles.boxes}>
                {

                    food.products.map(item => {

                        return (

                            <div className={styles.box}>
                                <img src={item.image} alt="" />
                                <div className={styles.body}>
                                    <h3 className='text-dark'>{item.title}</h3>
                                </div>
                            </div>
                        )
                    })

                }
            </div>

            <div className={styles.pagination}>

                <Pagination>
                    <Pagination.Prev onClick={prevPage} />
                    <Pagination.Ellipsis />

                    {
                        currentPage == 0 ?
                            <></>
                            :
                            <Pagination.Item onClick={prevPage}>{currentPage}</Pagination.Item>
                    }
                    <Pagination.Item active>{currentPage + 1}</Pagination.Item>

                    {
                        (currentPage + 1) * perPage >= food.totalProducts ?
                            <></>
                            :
                            <Pagination.Item onClick={nextPage}>{currentPage + 2}</Pagination.Item>
                    }
                    <Pagination.Ellipsis />
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            </div>



        </div>
    )
}
