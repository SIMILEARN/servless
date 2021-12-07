import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {
  const estudaintes  = await mysql.query(`SELECT
  persona.nombre_persona
  FROM
  persona
  WHERE
  persona.id_persona =
   (${req.body.idCurso})`);
  res.json(estudaintes);
  console.log();
}