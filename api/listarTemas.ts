import { NowRequest, NowResponse } from '@vercel/node'
import { mysql } from './lib/db';

export default async function (req: NowRequest, res: NowResponse) {



  const result = await mysql.query(`Select nombre from tema`);
  console.log(result);

  res.json(result);
}
    
  