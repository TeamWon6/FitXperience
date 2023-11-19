import axios from 'axios';

export default async function handler(req, res) {

    const {page} = req.query;

    const perPage = 10;

    let offset = (page) * perPage

     console.log('fetching food data')
  
    const axios = require('axios');
    const apiKey = '2e31241e471249e8939fe3bb7dc4c2dd';    
    const foodItem = 'apple';    
    const apiUrl = `https://api.spoonacular.com/food/products/search?query=${foodItem}&apiKey=${apiKey}&offset=${offset}`;    
    const data =await axios.get(apiUrl)

    console.log(data.data);
    res.send(data.data);
    res.end();

  
}
