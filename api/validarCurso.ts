import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';
const _respuestaMap = require('./lib/respuesta.map');
const joinjs = require('join-js')

export default async function (req: NowRequest, res: NowResponse) {

  const join = await mysql.query(`CALL validarCurso(${req.body.id_estudiante}, ${req.body.fk_estudiante})`);
 
  res.json(join);

}