import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {



  const result = await mysql.query(`SELECT nombre_curso,fecha_inicio,fecha_fin,estado FROM curso
                            	INNER JOIN persona ON curso.fk_docente = persona.id_persona
	                            INNER JOIN rol ON persona.fk_rol = rol.id_rol 
                              WHERE rol.nombre_rol = 'docente' AND fk_docente =${req.query.docente}`);
  console.log(result);

  res.json(result);
}
    
  