import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import ExcerciseSaved from '@/Models/ExcerciseSaved'
import Profile from '@/Models/Profile';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler(req, res) {
    await dbConnect();

    console.log('updating or creating profile')

    
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

    let profile = await Profile.findOne({user: currentUser._id}).exec();

    if(!profile){

        profile = new Profile({
            
    weight: req.query.weight,
    height: req.query.height,
    age: req.query.age,
    gender: req.query.gender,
    user: currentUser._id
        })
        await profile.save();
        console.log('new profile created');
        res.send('new profile created')
    }

    else{
        await Profile.updateOne({user: currentUser._id}, {
            weight: req.query.weight,
    height: req.query.height,
    age: req.query.age,
    gender: req.query.gender,
        }).exec();
        console.log('old profile updated')
        res.send('old profile updated')
    }

    


}