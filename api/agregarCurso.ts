import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default  async function (req: NowRequest, res: NowResponse)  {
 
    let {id,pin_curso,nombre_curso,fk_docente, fecha_inicio, fecha_fin,estado} = req.body;
 
      try {
        const result = await mysql.query(
          `INSERT INTO 
            curso 
          ( 
            id, 
            pin_curso,
            fk_docente, 
            nombre_curso, 
            fecha_inicio, 
            fecha_fin,
            estado
          ) 
          VALUES 
          (
            ${id},
            ${pin_curso},
            ${fk_docente},
            '${nombre_curso}',
            '${fecha_inicio}',
            '${fecha_fin}',
            '${estado}'
          )`);           
        res.json(result);
      } catch (error) {
        console.log('Error =>', error);
        res.send(error.sqlMessage);
      }
    };
    
  