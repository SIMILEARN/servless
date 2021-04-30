import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


    console.log("id" + req.body.id_persona+ "nombre "+req.body.nombre_persona );
    const result = await mysql.query("CALL actualizardocente('"+req.body.id_persona+"','"+req.body.nombre_persona+"','"+req.body.usser+"','"+req.body.pasword+"')");
    res.json(result);

};
