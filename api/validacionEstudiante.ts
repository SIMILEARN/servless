
import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

 //devuelve 0 o 1
  const join = await mysql.query(`call validarEstudiante(${req.body.usser, req.body.pin})`);

  res.json(join);


  }
  
 