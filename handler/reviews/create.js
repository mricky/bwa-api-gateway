const apiAdapter = require('../../routes/apiAdapter');

const {
    URL_SERVICE_COURSE 
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);
   
module.exports = async (req,res) => {
      console.log('test');
     try
     {
         const userId = req.user.data.id

        const reviews = await api.put('/api/reviews',{
            user_id : userId,
            ...req.body  // ini namanya spread, mengcopy
        });
       
        return res.json(reviews.data);

    } catch(error){
        // console.log(error);
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error',message: 'service unavailable'});
        }

        const {status,data} = error.response;
        
        return res.status(status).json(data);
    }
}