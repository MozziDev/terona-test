import type { NextApiRequest, NextApiResponse } from 'next'
import {IUser} from "../../src/interface/iUser";
import {getUserByWallet} from "../../lib/mysql/QueryUser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const user: IUser[] = await getUserByWallet(req.query.wallet as string);

        if (!user.length) {
            res.status(200).json({message: "Empty User's"})
        }
        res.status(200).json(user)
    }

    res.status(405).json({message: "Only GET methods"})


}