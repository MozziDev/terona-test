import type { NextApiRequest, NextApiResponse } from 'next';
import {updateBedding} from "../../lib/mysql/QueryBedding";
import {IResultQuery} from "../../src/interface/iResultQuery";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "PUT"){
       const bedding: IResultQuery = await updateBedding(JSON.parse(req.body));
        if (!bedding.status) {
            res.status(500).json(bedding)
        }else{
            res.status(200).json(bedding)
        }
    }else{
        res.status(405).json({message: "Only PUT methods"})
    }
};