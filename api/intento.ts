import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {

  let datos ={
    fk_test:req.body.fk_test,
    fk_incrispcion:req.body.fk_incrispcion,
    fecha_intento:req.body.fecha_intento 
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
          //Retorna el id de la factura que se acaba de insertar
          var idintento = result.id;
          /*Llama un procedimiento lmacenado para que inserte el detalle de la factura
            El procedimiento recibe como parámetros el id de la pregunta y el id del del test
            El procedimiento contiene un cursor que obtiene los productos y cantidades del detalle del pedido para saber cuales items debe agregar al detalle de la factura
          */
         console.log(idintento);
          await conn.query(`CALL intento(${req.body.fk_pregunta}, ${idintento})`, async (err, result) => {
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
  } catch (error) {
    console.log(error);
  } 

}