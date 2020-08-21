import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

  console.log(req.params.id)

  const result = await query(`SELECT 
            persona.nombre_persona,
             usuario.usser, 
             usuario.pasword 
             FROM 
             rol 
             INNER JOIN 
             persona
              ON 
              persona.fk_rol = rol.id_rol
            INNER JOIN
               Usuario
              ON 
              persona.id_persona =usuario.fk_persona
                WHERE rol.nombre_rol = "docente" and persona.id_persona = ${req.params.id}`);
  console.log(result[0])
  res.json(result[0]);


};

