import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';


export default async function (req: NowRequest, res: NowResponse) {

    mysql.beginTransaction(function(err) {
  if (err) { throw err; }
  mysql.query(`INSERT INTO persona set ( nombre_persona= '${req.body.nombre_persona}',
  edad_persona:${req.body.edad_persona},
  imagen_usuario:'${req.body.imagen_usuario},
  fk_rol : 1,
  fk_ie:${req.body.fk_ie}`, function(err, result) {

    if (err) { 
      mysql.rollback(function() {
        throw err;
      });
    }
 
    var log = result.id_persona;
 
    mysql.query(`call registroUsuario(${log},${req.body.pin}, ${req.body.usser}, ${req.body.pasword})`, function(err, result) {
      if (err) { 
        mysql.rollback(function() {
          throw err;
        });
      }  
      mysql.commit(function(err) {
        if (err) { 
          mysql.rollback(function() {
            throw err;
          });
        }
        console.log('Transaction Complete.');
        mysql.end();
      });
    });
  });
});
/* End transaction */


}
    
  