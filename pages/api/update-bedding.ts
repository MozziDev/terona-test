import type { NextApiRequest, NextApiResponse } from 'next';
import {updateBedding} from "../../lib/mysql/QueryBedding";
import {toast} from "react-toastify";
import update = toast.update;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "PUT"){
       const bedding = await updateBedding(JSON.parse(req.body));
        if (bedding.error) {
            res.status(500).json({
                status: true,
                errorMessage:bedding.sqlMessage
            })
        }
       res.status(200).json(bedding)
    }else{
        res.status(405).json({message: "Only PUT methods"})
    }
};