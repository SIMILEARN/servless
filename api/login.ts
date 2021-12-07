
import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

 //devuelve 0 o 1
  const join = await mysql.query(`call login_usuario(${req.body.user, req.body.pass})`);

  res.json(join);


  }
  
 