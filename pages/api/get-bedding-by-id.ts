import type { NextApiRequest, NextApiResponse } from 'next'
import {IBedding} from "../../src/interface/iBedding";
import {getBeddingById} from "../../lib/mysql/QueryBedding";
import {IManufacturer} from "../../src/interface/iManufacturer";
import {getManufactures} from "../../lib/mysql/QueryManufacturer";
import {IBeddingSize} from "../../src/interface/iBeddingSize";
import {getSizes} from "../../lib/mysql/QuerySizes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const idBedding:string = req.query.id as string;

        const bedding: IBedding= await getBeddingById(idBedding);
        const manufacturers: IManufacturer[] = await getManufactures();
        const sizes: IBeddingSize[] = await getSizes();

        if (!bedding) {
            res.status(500).json({message: "Empty Bedding's"})
        }else{
            const resData = {
                bedding,
                manufacturers,
                sizes
            }

            res.status(200).json(resData)
        }

    }else{
        res.status(405).json({message: "Only GET methods"})
    }
}