const apiAdapter = require('../../routes/apiAdapter');

const {
    URL_SERVICE_COURSE 
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);
   
module.exports = async (req,res) => {

     try
     {
        const mentor = await api.get('/api/mentors');
       
        return res.json(mentor.data);

    } catch(error){
        // console.log(error);
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error',message: 'service unavailable'});
        }

        const {status,data} = error.response;
        
        return res.status(status).json(data);
    }
}