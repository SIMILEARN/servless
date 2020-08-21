import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


/* traer   preguntas de un test de im  */

    console.log(req.query.id)
    try {
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
    }
    catch (error) {
        console.log('Error =>', error);
        res.send(error.sqlMessage);
    }
};

