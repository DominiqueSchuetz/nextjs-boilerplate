import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log('todo route is hit', req.query.name);
    res.end();
};
