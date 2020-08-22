import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


    const result = await mysql.query(`

        SELECT texto 
        FROM pregunta
         INNER JOIN 
      tema On  tema.id = pregunta.fk_tema
        INNER JOIN 
     tipo_tema ON tema.fk_tipo_tema=tipo_tema.id_tipotema 
         where
      tipo_Tema.id_tipotema= ${req.query.id}`);
    res.json(result);

};

