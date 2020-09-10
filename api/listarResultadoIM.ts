
import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {


    try {
        await mysql.getConnection((err, conn) => {

            //Inicia la transacción
            conn.beginTransaction(async function (err) {
                if (err) { throw err; }
                await conn.query(`CALL resultadoTest(${req.body.fk_intento})`, async (err, result) => {
                    if (err) {
                        conn.rollback(() => {
                            throw err;
                        });
                    }


                 const resultado =   await conn.query(`CALL prueba(${result})`, async (err, result) => {
                        if (err) {
                            conn.rollback(() => {
                                throw err;
                            });
                        }
                    });
                    await conn.commit(async function (err) {
                        if (err) {
                            await conn.rollback(async function () {
                                throw err;
                            });
                        }
                        await conn.release();
                        res.json(resultado);
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
    }

};
