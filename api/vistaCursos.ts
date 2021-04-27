import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {
  const cursos  = await mysql.query("SELECT * FROM curso");
  res.json(cursos);
  console.log();
}