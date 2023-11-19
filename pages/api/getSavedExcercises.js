import axios from 'axios';
import dbConnect from '@/utils/db';
import { getToken } from 'next-auth/jwt'
import ExcerciseSaved from '@/Models/ExcerciseSaved';
import User from '@/Models/User';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler(req, res) {
  
    await dbConnect();

    console.log('finding saved excercises')

  

    const token = await getToken({ req, secret })


    let currentUser = null;

    if (!token || !token.sub) {
        res.status(401).end();
        return
    }

    else {
        currentUser = await User.findOne({ id: token.sub }).exec();
    }

    const savedExcercises = await ExcerciseSaved.find({user: currentUser._id}).exec();


    let savedExcercisesData = await throwSavedExcerciseData(savedExcercises)

    console.log('awaited throw function');

  
}


async function throwSavedExcerciseData(savedExcercises){

    console.log('inside throw function ')

    let savedExcercisesData = [];

    savedExcercises.forEach( async elem=>{
         console.log('individual req')

        const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises/exercise/' + elem.excerciseId,
            headers: {
              'X-RapidAPI-Key': '830872fc41msh784d7f23e99cb23p1fdb8djsn6f9e88ce458b',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
          };

          try {
            const response = await axios.request(options);
            console.log(response.data.id)
            savedExcercisesData.push(response.data);
        } catch (error) {
            console.error(error);
        }
          

    })
    console.log({savedExcercisesData})
    return savedExcercisesData
}