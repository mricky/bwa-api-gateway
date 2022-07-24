const apiAdapter = require('../../routes/apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER ,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);
   
module.exports = async (req,res) => {

     try
     {
        const users = await api.post('/users/login',req.body);
        // sukes memangil object user, lalu generate token
        const data = users.data.data;
        const token = jwt.sign({data},JWT_SECRET,{expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
        const refreshToken = jwt.sign({data},JWT_SECRET_REFRESH_TOKEN,{expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
       
        // insert refresh token 
        await api.post('refresh_tokens',{user_id: data.id, refresh_token : refreshToken});

        return res.json({
            status: 'success',
            data : {
                token: token,
                refresh_token: refreshToken
            }
        })
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