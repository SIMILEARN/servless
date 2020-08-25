import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {

  const join = await mysql.query(`CALL resultadoTest(${req.body.fk_pregunta}, ${req.body.fk_respuesta})`);
 
  res.json(join);

}