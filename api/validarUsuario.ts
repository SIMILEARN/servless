import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {

    var username = req.body.username,
        password = req.body.password;

    if (!username || !password) {
        return res
            .status(400)
            .json({
                error: "Needs a json body with { username: <username>, password: <password>}"
            });
    }

    if (username !== password) {
        return res
            .status(401)
            .json({
                error: "Authentication failied.",
            });
    }

    try {
        const result = await mysql.query(`call procedure validarUsuario(${username},${password})`);
        if (result == true){
            res.json(result);
        }else {
            return res
            .status(401)
            .json({
                error: "Authentication failied.",
            });
        }

    } catch (error) {
        console.log('Error =>', error);
        res.send(error.sqlMessage);
    }
};

