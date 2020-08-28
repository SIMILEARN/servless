import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


 
  const result = await mysql.query(`CALL inscripcion(${req.query.pin}, ${req.query.fk_estudiante})`);
  console.log(result);

  res.json(result);
}
    
  