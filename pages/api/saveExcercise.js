import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import ExcerciseSaved from '@/Models/ExcerciseSaved'

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler(req, res) {
    await dbConnect();

    console.log('saving excercise')

    const {id} = req.query;
    console.log(id);

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

    let es = await ExcerciseSaved.find({user: currentUser._id, excerciseId: ''+id}).exec();
    console.log('does this already exist');
    console.log(es);

    if(es.length > 0){
        console.log('yes');
        let es = await ExcerciseSaved.deleteOne({user: currentUser._id, excerciseId: ''+id}).exec();
        res.status(409).end();
        return;
    }

    console.log('no');


    es = new ExcerciseSaved({
    user: currentUser._id,
    excerciseId: ''+id,
    })

    await es.save();
    console.log('saved');
    res.status(200).end();

}