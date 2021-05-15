
import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


  const result = await mysql.query("select id_persona, nombre_persona, usser, pasword from  persona INNER JOIN usuario ON (persona.id_persona =usuario.fk_persona) WHERE persona.nombre_persona= 'adan';");
  res.json(result);

};
