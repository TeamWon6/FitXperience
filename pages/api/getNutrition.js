import axios from 'axios';

export default async function handler(req, res) {

    const axios = require('axios');

const apiKey = '2e31241e471249e8939fe3bb7dc4c2dd';

const productId = '16878';

const nutritionApiUrl = `https://api.spoonacular.com/food/products/${productId}?apiKey=${apiKey}`;

const response = await axios.get(nutritionApiUrl)

console.log(response.data);
res.send(response.data);
  

  
}
