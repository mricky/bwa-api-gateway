const axios = require('axios');
const {TIMEOUT } = process.env
cors = require('cors');

module.exports = (baseUrl) => {
  
    return axios.create({
        baseURL:baseUrl,
        timeout : TIMEOUT
    })
}