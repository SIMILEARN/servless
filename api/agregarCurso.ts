import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

  try {
    const result = await mysql.query(`INSERT INTO curso
         (id, pin_curso, fk_docente, nombre_curso,fecha_inicio,fecha_fin,estado) 
         VALUES (${req.body.id},${req.body.pin_curso},${req.body.fk_docente},
          '${req.body.nombre_curso}','${req.body.fecha_inicio}','${req.body.fecha_fin}',${req.body.estado})`);
    res.json(result);
  } catch (error) {
    console.log('Error =>', error);
    res.send(error.sqlMessage);
  }
};

