import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {
/* traer nombre de un test de im  */

    console.log(req.query.id)
    try {
        const result = await mysql.query(`SELECT tipo_tema FROM tipo_tema
      INNER JOIN tema On  tema.fk_tipo_tema = tipo_tema.id_tipotema
     INNER JOIN pregunta ON tema.id=pregunta.fk_tema where tipo_Tema.id_tipotema='${req.query.id}'`);
        res.json(result);
    }
    catch (error) {
        console.log('Error =>', error);
        res.send(error.sqlMessage);
    }
};


