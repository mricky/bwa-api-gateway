const apiAdapter = require('../../routes/apiAdapter');
const jwt = require('jsonwebtoken');
const refreshTokens = require('.');
const { response } = require('../../app');
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
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;
        
        if(!refreshToken || !email){
            return res.status(400).json({
                status: 'error',
                message: 'invalid token'
            })
        }
        // check refrsh token apakah ada ?
        await api.get('/refresh_tokens',{
            params: {
                refresh_token: refreshToken
            }
        }) 
        // jika valid, check apakah kadaluarsa
        jwt.verify(refreshToken,JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if(err){
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                })
            }

            if(email != decoded.data.email){
                return res.status(400).json({
                    status: 'error',
                    message: 'invalid token'
                })
            }
            // jika verify .. buat token baru
            //console.log(decoded.data);
            const token = jwt.sign({data: decoded.data}, JWT_SECRET, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
             return res.json({
                status: 'success',
                data : {
                    token : token
                }
             })
        });
       
    } catch(error){
        // console.log(error);
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error',message: 'service unavailable'});
        }
      //  console.log(error);
        const { status,data } = error.response;
        
        return res.status(status).json(data);
    }
}