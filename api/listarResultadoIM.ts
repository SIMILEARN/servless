import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


    const result = await mysql.query(`
        SELECT *  FROM resultado_test
        INNER JOIN detalle_resultado On  resultado_test.fk_detalle_resultado= detalle_resultado.id
        INNER JOIN intento On intento.id =detalle_resultado.fk_intento
        INNER JOIN  inscripcion ON intendo.fk_inscripcion =inscripcion.id
        INNER JOIN  persona ON inscripcion.fk_estudiante =persona.id_persona
        where persona.id_persona= ${req.query.id}`);
    res.json(result);


};
