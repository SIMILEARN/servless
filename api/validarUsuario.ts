
import { mysql } from './lib/db';
import { NowRequest, NowResponse } from '@vercel/node';
//import escape from 'sql-template-strings';
//import allowCors from './lib/allowCors';
//import { sign } from 'jsonwebtoken';

export default async function (req: NowRequest, res: NowResponse) {

    try {
      if ((typeof req.body.user !== "undefined" && req.body.user) && (typeof req.body.password  !== "undefined" && req.body.password)) {
      const result = await mysql.query(`SELECT * FROM usuario WHERE usuario.usser = "${req.body.user}" AND usuario.pasword = "${req.body.password}"`)
      .then(response => {
        if (response.length === 0){
          errorCath(res, 401, 'El usuario no existe')
        }else {
          res.json(response);
        }
    
    })
    } else {
      errorCath(res, 400, 'Usuario y contraseña son obligatorias')
    }


    } catch (error) {
      console.log('Error =>', error);
      res.send(error.sqlMessage);
    } 
  };

const errorCath = (res, code, msg) => {
  return (msg != null)
  ? res.status(code).json({ error: msg })
  : res.status(code).send(null)
}

    
 



