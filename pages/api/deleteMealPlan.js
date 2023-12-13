import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import MealPlan from '@/Models/MealPlan';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler (req,res){
    await dbConnect();

    console.log('deleting meal plan')
    console.log(req.query)

    const data = await MealPlan.deleteOne({_id: req.query.id}).exec();   
    console.log(data);
    res.send('done');  
}