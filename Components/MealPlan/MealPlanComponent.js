import React, { useEffect, useState, useRef } from 'react'
import styles from '../Excercises/Excercises.module.css'
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { IoIosClose } from "react-icons/io";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';




axios.defaults.withCredentials = true;

export default function MealPlanComponent() {

    const router = useRouter();

const [food, setfood] = useState(null)
    const [selectedFood, setselectedFood] = useState(null);
    const [selectedFoodNutrition, setselectedFoodNutrition] = useState(null);

    async function viewDetails(item) {
        console.log('get details');
        console.log(item.id)
        const response = await axios.get('/api/getNutrition', { params: { id: item.id } });
        console.log(response.data);
        setselectedFoodNutrition(response.data);

        setselectedFood(item);
    }

    

    const getFood = async function () {

        console.log(router.query);
        const response = await axios.get('/api/getMealPlanItems',{params:{id: router.query.id}});
        console.log(response.data);
        setfood(response.data);

    }

    useEffect(() => {
        if(router.query.id)
        getFood();
    }, [router.query])

    return (
        <div className={styles.page}>

            {
                selectedFood &&
                <div className={`overlay ${styles.overlay} ${selectedFood ? '' : styles.close}`}>
                    <div className={styles.popup}>
                        <h3>{selectedFood.title}</h3>
                        <p className='text-main'>Total Calories: {selectedFoodNutrition.nutrition.calories}KCAL</p>
                        <IoIosClose className={styles.close} size={'32px'} onClick={() => { setselectedFood(null) }} />
                        <img src={selectedFood.image} alt="" />


                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nutrient</th>
                                    <th>Amount (grams)</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedFoodNutrition &&
                                    selectedFoodNutrition.nutrition.nutrients.map(elem => {
                                        return (
                                            <>
                                                <tr>

                                                    <td>{elem.name}</td>
                                                    <td>{elem.amount}</td>
                                                </tr>

                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>

                        
                    </div>
                </div>
            }

            <h1 className='text-main'>Food Items</h1>


            <div className={styles.boxes}>
                {
                    food &&

                    food.map(item => {

                        return (

                            <div className={styles.box} onClick={() => { viewDetails(item) }}>
                                <img src={item.image} alt="" />
                                <div className={styles.body}>
                                    <h3 className='text-dark'>{item.title}</h3>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
            
        </div>
    )
}
