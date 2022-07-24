const apiAdapter = require('../../routes/apiAdapter');


const {
    URL_SERVICE_USER 
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);
   
module.exports = async (req,res) => {

     try
     {
         // ambil id dari return verifyToken middleware
         const id = req.user.data.id;

         const users = await api.post('/users/logout/',{user_id: id});
        
         return res.json(users.data);

    } catch(error){
        // console.log(error);
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error',message: 'service unavailable'});
        }
        //console.log(error.response);
        const { status,data } = error.response;
        
        return res.status(status).json(data);
    }
}