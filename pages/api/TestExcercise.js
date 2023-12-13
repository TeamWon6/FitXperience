import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import ExcerciseSaved from '@/Models/ExcerciseSaved'
import axios from 'axios';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler(req, res) {
    console.log('testing excercises endpoint')
    await dbConnect();

    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '10'},
        headers: {
          'X-RapidAPI-Key': '9bb02131e9msheef00c4c12f9e7cp1422e1jsn92e056a15118',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          res.send(response.data);
      } catch (error) {
          console.error(error);
      }

}