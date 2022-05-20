import type { NextApiRequest, NextApiResponse } from 'next'
import {IBedding} from "../../src/interface/iBedding";
import {getBeddingById} from "../../lib/mysql/QueryBedding";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const reqBody =req.query;
        const bedding: IBedding = await getBeddingById(reqBody.id);

        if (!bedding) {
            res.status(500).json({message: "Empty Bedding's"})
        }
        res.status(200).json(bedding[0])
    }else{
        res.status(405).json({message: "Only GET methods"})
    }



}