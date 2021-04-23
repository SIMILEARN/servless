import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {

  let datos ={
    fk_test:req.body.fk_test,
    fk_incrispcion:req.body.fk_incrispcion
  }
 
  try {
    await mysql.getConnection((err, conn) => {
    
      //Inicia la transacción
      conn.beginTransaction( async function(err) {
        if (err) { throw err; }
        await conn.query("INSERT INTO intento set ?", [datos], async (err, result) => {
          if (err) { 
            conn.rollback(() => {
              throw err;
            });
          }
          var idintento = result.id;

         Object.values(req.body.respuestas).map(async (respuesta) => {
         const result = await conn.query(`CALL intento(${idintento}, ${respuesta})`, async (err, result) => {
            if(err){
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
            res.json(result);
          });
        });
        });
      });
    });
  } catch (error) {
    console.log(error);
  } 

}