const apiAdapter = require('../../routes/apiAdapter');

const {
    URL_SERVICE_COURSE,
    HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);
   
module.exports = async (req,res) => {

     try
     {
        const chapter = await api.get('/api/chapters',{
            params: {
                ...req.query
            }
        });
       
        const chapterData = chapter.data;
       
        return res.json(chapterData);

    } catch(error){
        // console.log(error);
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error',message: 'service unavailable'});
        }

        const {status,data} = error.response;
        
        return res.status(status).json(data);
    }
}