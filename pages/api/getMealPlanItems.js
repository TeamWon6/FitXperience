import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import MealPlan from '@/Models/MealPlan';
import MealPlanItem from '@/Models/MealPlanItem';
import axios from 'axios';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';
const apiKey = '2e31241e471249e8939fe3bb7dc4c2dd';    




export default async function handler (req,res){
    console.log('getting meal plan items');
    console.log(req.query) 

    await dbConnect();

    const token = await getToken({ req, secret })
    const session = await getSession({ req })

    if (!token || !token.sub) {
        res.status(401);
        return res.end();
    }
    const currentUser = await User.findOne({id:token.sub}).exec();

    const mealPlanItems = await MealPlanItem.find({mealPlan: req.query.id}).exec()


    const data = await throwMealPlanItemsData(mealPlanItems)

    console.log(data);

    res.send(data);
    res.end();

   
}



async function throwMealPlanItemsData(mealPlanItems) {

    let savedMealPlanData = [];


    // Create an array of promises
    const promises = mealPlanItems.map(async (elem, index) => {
        console.log('getting specific product');
        console.log(elem.id)
        const options = {
            method: 'GET',
            url: `https://api.spoonacular.com/food/products/${elem.foodId}?apiKey=${apiKey}`,
        };

        try {
            const response = await axios.request(options);
            savedMealPlanData.push(response.data);
        } catch (error) {
            console.error(error);
        }
    });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(promises);

    // Now, after all requests are completed, log the savedExcercisesData
    // console.log({ savedMealPlanData });

    // Assuming this is inside an async function, you can return the data
    return savedMealPlanData;

}