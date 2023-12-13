import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import ExcerciseSaved from '@/Models/ExcerciseSaved'
import Profile from '@/Models/Profile';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler(req, res) {
    await dbConnect();

    console.log('getting bmi')

    const token = await getToken({ req, secret })
    const session = await getSession({ req })


    let currentUser = null;

    if (!token || !token.sub) {
        res.status(401).end();
        return res.end();
    }

    else {
        currentUser = await User.findOne({ id: token.sub }).exec();
    }

    const profile = await Profile.findOne({user: currentUser._id}).exec();
    const heightMeters = profile.height * 0.0254;

    const bmi = profile.weight / Math.pow(heightMeters, 2);
    console.log(bmi);

    const bmr = profile.gender === 'male'
        ? 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age)
        : 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);

    // Adjust BMR based on activity level
    

    const calories = bmr * 1.35;
    console.log(calories);


    res.send({bmi: bmi, calories: calories});






}