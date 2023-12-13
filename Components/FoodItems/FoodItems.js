import React, { useEffect, useState, useRef } from 'react'
import styles2 from './FoodItems.module.css'
import styles from '../Excercises/Excercises.module.css'
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { IoIosClose } from "react-icons/io";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';




axios.defaults.withCredentials = true;

export default function FoodItems() {

    const search = useRef(null);
    const [food, setfood] = useState(null)
    const [currentPage, setcurrentPage] = useState(0)
    const [selectedFood, setselectedFood] = useState(null);
    const [selectedFoodNutrition, setselectedFoodNutrition] = useState(null);

    const mealPlans = useRef(null);
    const [selectedMealPlan, setselectedMealPlan] = useState(null);


    async function getMealPlans() {
        console.log('getting meal plans')
        try {
            const response = await axios.get('api/getMealPlans');
            console.log(response);
            mealPlans.current = response.data;

            console.log(mealPlans)
        }
        catch (e) {
        }
    }

    async function addFoodItem(){
        console.log('adding food item')
        console.log({selectedMealPlan})
        console.log(selectedFood)

        let index = -1;
        for (let i = 0; i < mealPlans.current.length; i++) {
            if (mealPlans.current[i].name === selectedMealPlan) {
              index = i;
            }
          }
        const response = await axios.post('/api/addFoodItem', {params: {foodId: selectedFood.id, mealPlanId: mealPlans.current[index]._id}})
        console.log(response);
        setselectedFood(null);
    }

    useEffect(() => {
        getMealPlans()
    }, [])

    async function viewDetails(item) {
        const response = await axios.get('api/getNutrition', { params: { id: item.id } });
        console.log(response.data);
        setselectedFoodNutrition(response.data);

        setselectedFood(item);
    }

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


        if (!search || search == null || search.current == null || search.current.value == null || search.current.value == '') {
            return;
        }

        const response = await axios.get('api/getFoodData', { params: { page: currentPage, foodItem: search.current.value } });
        setfood(response.data);

    }

    useEffect(() => {
        getFood();
    }, [currentPage])

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

                        <Dropdown>
                            {
                                selectedMealPlan != null ?
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {selectedMealPlan}
                                    </Dropdown.Toggle>
                                    :
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Select Meal Plan
                                    </Dropdown.Toggle>

                            }

                            <Dropdown.Menu>

                                {
                                    mealPlans.current.map((elem, index) => {
                                        return (
                                            <Dropdown.Item onClick={() => {setselectedMealPlan(elem.name) }}>meal plan {elem.name}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                            {
                                selectedMealPlan != null
                                &&
                            <Button variant="primary" onClick={()=>{addFoodItem()}}>Add food to meal plan {selectedMealPlan}</Button>
                            }

                    </div>
                </div>
            }

            <h1 className='text-main'>Food Items</h1>

            <div className={styles2.search}>
                <input type="text" ref={search} />
                <IoIosSearch size={'32px'} className='text-main' onClick={getFood} />
            </div>

            <div className={styles.boxes}>
                {
                    food &&

                    food.products.map(item => {

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
            {
                food &&

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
            }



        </div>
    )
}
