import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

  
    const { nombre_persona, usuario, contraseña } = req.body;
    try {
      const result = await mysql.query(`
          UPDATE 
            persona 
          INNER JOIN 
            usuario 
          ON 
            usuario.fk_persona = persona.id_persona
          SET 
            persona.nombre_persona = '${nombre_persona}',
            usuario.usser= '${usuario}',
             usario.pasword='${contraseña}'
          WHERE  
            id_persona = ${req.query.id}`);
      res.json(result);
  
    } catch (error) {
      console.log('Error =>', error);
      res.send(error.sqlMessage);
    }
  };
  
  
  
 