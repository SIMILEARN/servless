
import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

 
  const join = await mysql.query(`call validarEstudiante(${req.body.nombre, req.body.pin})`);

  res.json(join);


  }
  
 