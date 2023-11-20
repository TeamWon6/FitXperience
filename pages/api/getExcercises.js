// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req, res) {

  const {page} = req.query;


    const perPage = 10;
    let offset = (page) * perPage

   

  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises?offset=${offset}`,
    headers: {
      'X-RapidAPI-Key': 'c46940a0camsh14fd75c9c89e4d5p1a1fc0jsnb5dd2face6d9',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    }
  }

  const response = await axios.request(options);
  res.send(response.data);


}


