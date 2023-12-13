import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import MealPlan from '@/Models/MealPlan';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler (req,res){
    await dbConnect();

    console.log('creating meal plan')
    console.log(req.query)

    const token = await getToken({ req, secret })
    const session = await getSession({ req })

    if (!token || !token.sub) {
        res.status(401);
        return res.end();
    }
    const currentUser = await User.findOne({id:token.sub}).exec();
   
    const mealPlan = new MealPlan({
        user: currentUser._id,
        name: req.query.planName
    })
    await mealPlan.save();
    
    console.log(mealPlan)
    res.end();       
}