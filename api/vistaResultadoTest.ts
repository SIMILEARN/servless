import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

  
  const join = await mysql.query(`call vistaResultadoTestIM(${req.body.fk_intento})`);

  res.json(join);

  };
  
  
  
 