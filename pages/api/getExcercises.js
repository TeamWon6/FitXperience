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
      'X-RapidAPI-Key': '0eab9fdb87msh1a624a569dc0e05p17861fjsnc4706cf76fbf',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    }
  }

  const response = await axios.request(options);
  res.send(response.data);


}


