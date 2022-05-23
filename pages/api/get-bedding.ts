import type { NextApiRequest, NextApiResponse } from 'next'
import {IBedding} from "../../src/interface/iBedding";
import {getBedding} from "../../lib/mysql/QueryBedding";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const bedding: IBedding[] = await getBedding();
        if (!bedding.length) {
            res.status(500).json({message: "Empty Bedding's"})
        }
        res.status(200).json(bedding)
    }

    res.status(405).json({message: "Only GET methods"})


}