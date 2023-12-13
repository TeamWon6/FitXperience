import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import ExcerciseSaved from '@/Models/ExcerciseSaved'
import Profile from '@/Models/Profile';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler(req, res) {
    await dbConnect();

    console.log('getting profile')

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
    res.send(profile);


}