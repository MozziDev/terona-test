import type { NextApiRequest, NextApiResponse } from 'next';
import {addUserByWallet} from "../../lib/mysql/QueryUser";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT"){
        const bodyRequest = JSON.parse(req.body)
        const user = await addUserByWallet(bodyRequest.wallet);
        if (user.length) {
            res.status(500).json({
                status: false,
                text: "Failed to add a user"
            })
        }
        res.status(200).json(user)
    }else{
        res.status(405).json({message: "Only PUT methods"})
    }
};