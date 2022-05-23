import type { NextApiRequest, NextApiResponse } from 'next'
import {deleteBedding, getBedding} from "../../lib/mysql/QueryBedding";
import {IResultQuery} from "../../src/interface/iResultQuery";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        const bodyRequest: any = JSON.parse(req.body)
        const resultData: IResultQuery = await deleteBedding(bodyRequest.id);
        if (!resultData.status) {
            res.status(500).json(resultData)
        }
        res.status(200).json(resultData)
    }

    res.status(405).json({message: "Only GET methods"})


}