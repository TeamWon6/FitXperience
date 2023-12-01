import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import MealPlan from '@/Models/MealPlan';
import MealPlanItem from '@/Models/MealPlanItem';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler (req,res){
    await dbConnect();

    const token = await getToken({ req, secret })
    const session = await getSession({ req })

    if (!token || !token.sub) {
        res.status(401);
        return res.end();
    }
    const currentUser = await User.findOne({id:token.sub}).exec();

    console.log(req.body.params)
    console.log(req.body.params.mealPlanId)
    console.log(req.body.params.foodId)

    const mealItem = new MealPlanItem({
        user: currentUser._id,
        mealPlan : req.body.params.mealPlanId,
        foodId: req.body.params.foodId
    })

    await mealItem.save();
    res.end();   
}