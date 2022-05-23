import type { NextApiRequest, NextApiResponse } from 'next';
import {insertBedding} from "../../lib/mysql/QueryBedding";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "PUT"){
       const bedding = await insertBedding(JSON.parse(req.body));
       console.log("Api bedding",bedding)
        if (!bedding.status) {
            res.status(500).json({
                status: false,
                errorMessage:bedding.text
            })
        }
       res.status(200).json(bedding)
    }else{
        res.status(405).json({message: "Only PUT methods"})
    }
};