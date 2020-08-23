import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {
  const preguntas = await mysql.query("SELECT * FROM pensum");
  res.json(preguntas);
  console.log();
}