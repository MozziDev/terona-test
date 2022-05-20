import type { NextApiRequest, NextApiResponse } from 'next'
import {IBeddingSize} from "../../src/interface/iBeddingSize";
import {getSizes} from "../../lib/mysql/QuerySizes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const manufacturers: IBeddingSize[] = await getSizes();

    res.status(200).json(manufacturers)
}
