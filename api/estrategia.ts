import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';
const _estrategiaMap = require('./lib/estrategias.map');
const joinjs = require('join-js')

export default async function (req: NowRequest, res: NowResponse) {

  const estrategia = await mysql.query(`call vistaEstrategias(${req.query.id_tema})`);
  const join = await joinjs.default.map(estrategia, _estrategiaMap, 'estrategiaMap', 'estrategia_');
  console.log("estrategiaMap "+ _estrategiaMap);
  console.log("estrategia "+estrategia);
  res.json(estrategia);

}