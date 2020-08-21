
import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


    console.log(req.query.id)
    try {
      const result = await mysql.query(
        `SELECT
         usuario.usser, 
         usuario.pasword
           FROM
             persona 
              INNER JOIN
               Usuario 
               ON
                persona.id_persona =usuario.fk_persona 
                WHERE usuario.usser= '${req.query.id}'`);
      res.json(result);
    }
    catch (error) {
      console.log('Error =>', error);
      res.send(error.sqlMessage);
    }

  }
  
 