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

    const savedExcercises = await ExcerciseSaved.find({ user: currentUser._id }).exec();


    let savedExcercisesData = await throwSavedExcerciseData(savedExcercises)


    res.send(savedExcercisesData);



}


async function throwSavedExcerciseData(savedExcercises) {

    let savedExcercisesData = [];

    // Create an array of promises
    const promises = savedExcercises.map(async (elem, index) => {
        const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises/exercise/' + elem.excerciseId,
            headers: {
                'X-RapidAPI-Key': '0eab9fdb87msh1a624a569dc0e05p17861fjsnc4706cf76fbf',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            savedExcercisesData.push(response.data);
            console.log('---------');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(promises);

    // Now, after all requests are completed, log the savedExcercisesData
    console.log({ savedExcercisesData });

    // Assuming this is inside an async function, you can return the data
    return savedExcercisesData;

}