import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {

  let datos = {
    fk_test: req.body.fk_test,
    fk_incrispcion: req.body.fk_incrispcion
  }

  const intento = await mysql.query('call intento (?,?)', [req.body.idUsser, req.body.fkTest]);
  
  let results = await mysql.transaction()
    .query('call insercionRespuestaEstudiante (?,?)', [req.body.idRes,req.body.idPre])
    .query((r) => ['INSERT INTO desatalle_resultado (fk_intento, fk_respuesta) values (?,?)', [intento.insertId,r.insertId]])
    .rollback(e => { /* do something with the error */ }) // optional
    .commit()

  res.json(results);

}