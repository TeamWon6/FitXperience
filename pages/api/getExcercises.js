// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    headers: {
      'X-RapidAPI-Key': '830872fc41msh784d7f23e99cb23p1fdb8djsn6f9e88ce458b',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    }
  }

  const response = await axios.request(options);

  res.send(response.data);
  
}
