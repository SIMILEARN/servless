import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {


  let results = await mysql.transaction()
  .query(`insert into intento set fk_test = ?, fk_inscripcion = (SELECT
    inscripcion.id
  FROM
    usuario
    INNER JOIN
    persona
    ON 
      usuario.fk_persona = persona.id_persona
    INNER JOIN
    inscripcion
    ON 
      persona.id_persona = inscripcion.fk_estudiante
      where usuario.id_usuario = ?), fecha_intento= NOW(),	estado = "Sin terminar"`, [req.body.fkTest, req.body.idUsser] )
  .query((r) => [
  'call insercionRespuestaEstudiante (?,?,?)', [req.body.idRes,req.body.idPre, r.insertId]
   ])
  .rollback(e => { /* do something with the error */ }) // optional
  .commit()

  console.log(results.insertId);


res.json(results);
  }