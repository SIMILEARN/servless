import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';
const _respuestaMap = require('./lib/respuesta.map');
const joinjs = require('join-js')

export default async function (req: NowRequest, res: NowResponse) {

  const preguntas = await mysql.query(`call vistaEstrategias(${req.body.id_tema})`);
  const join = await joinjs.default.map(preguntas, _respuestaMap, 'preguntaMap', 'pregunta_');
  res.json(join);

}