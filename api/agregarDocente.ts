import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {

  let results = await mysql.transaction()
  .query('INSERT INTO persona (nombre_persona,edad_persona,fk_rol,fk_ie) values (?,?,?,?)', [req.body.nombre_persona,req.body.edad_persona,req.body.fk_rol,req.body.fk_ie])
  .query((r) => ['insert into usuario (usser, pasword, fk_persona) values (?,?,?)', [req.body.usser,req.body.pasword, r.insertId]])
  .rollback(e => { /* do something with the error */ }) // optional
  .commit() 

}

