import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {


  let datos ={
    nombre_persona:req.body.nombre_persona,
    edad_persona:req.body.edad_persona,
    imagen_usuario:req.body.imagen_usuario,
    fk_rol : 1,
    fk_ie:req.body.fk_ie
  }
 
  try {
    await mysql.getConnection((err, conn) => {
    
      //Inicia la transacción
      conn.beginTransaction( async function(err) {
        if (err) { throw err; }
        await conn.query("INSERT INTO persona set ?", [datos], async (err, result) => {
          if (err) { 
            conn.rollback(() => {
              throw err;
            });
          }
          //Retorna el id de la factura que se acaba de insertar
          var idEstudiante = result.id_persona;
          /*Llama un procedimiento almacenado para que inserte el detalle de la factura
            El procedimiento recibe como parámetros el id de la pregunta y el id del del test
            El procedimiento contiene un cursor que obtiene los productos y cantidades del detalle del pedido para saber cuales items debe agregar al detalle de la factura
          */
         console.log(idEstudiante);
         
          const resultado = await conn.query(`CALL inscripcion(${req.body.pin}, ${idEstudiante})`, async (err, result) => {
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
            res.json(resultado);
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
  } 

}
    
  