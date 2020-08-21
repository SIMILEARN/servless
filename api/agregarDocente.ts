import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse)  {

    let {id_persona,nombre_persona, edad_persona, usser, fk_ie, pasword, id_usuario} = req.body;
    console.log(req.body);
   try {
  
         const persona= await mysql.query(`
         INSERT INTO 
         persona
          (
            id_persona,
            nombre_persona,
            edad_persona,
            fk_rol,
            fk_ie)
          VALUES (
            ${id_persona},
              '${nombre_persona}',
              '${edad_persona}',
              2,
              ${fk_ie}
          )` 
          );    

         const user = await mysql.query(`
         INSERT INTO
          usuario
          (
            id_usuario,
            usser, 
            pasword,
            fk_persona

          )
          VALUES 
          ( 
             ${id_usuario},
            '${usser}',
            '${pasword}',
            ${id_persona}
          )`
        ); 
          
      res.json({"success": 'ok'});
    } catch (error) {
      console.log('Error =>', error);
      res.send(error.sqlMessage);
    }
  };