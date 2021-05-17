
import { mysql } from './lib/db';


import { NowRequest, NowResponse } from '@vercel/node';
import escape from 'sql-template-strings';
import allowCors from './lib/allowCors';
import { sign } from 'jsonwebtoken';

export default async function (req: NowRequest, res: NowResponse) {


const handler = async (req: NowRequest, res: NowResponse) => {
  if(req.method === 'POST'){
    try {
      req.body
      const { user, password } = req.body;
      if ((typeof user !== "undefined" && user) && (typeof password  !== "undefined" && password)) {
        await mysql(escape`SELECT * FROM usuario WHERE username = ${user} AND password = ${password}`)
        .then(response => {
          if (response.length === 0){
            errorCath(res, 401, 'El usuario no existe')
          } else {
            sign(response[0], 'privateKey', { expiresIn: 30 }, (err, token) => {
              if(!err){
                res.json({token:token})
              } else {
                console.log(err.toString())
                errorCath(res, 500, null)
              }
            })
          }
        })
      } else {
        errorCath(res, 400, 'Usuario y contraseña son obligatorias')
      }
    } catch (error) {
      errorCath(res, 400, 'Las credenciales son incorrectas')
    }
  } else {
    res.status(405).send(null);
  } 
}

const errorCath = (res, code, msg) => {
  return (msg != null)
  ? res.status(code).json({ error: msg })
  : res.status(code).send(null)
}

module.exports = allowCors(handler)

    
 



};

