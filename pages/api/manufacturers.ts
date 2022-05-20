import type { NextApiRequest, NextApiResponse } from 'next'
import {getManufactures} from "../../lib/mysql/QueryManufacturer";
import {IManufacturer} from "../../src/interface/iManufacturer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const manufacturers: IManufacturer[] = await getManufactures();

    res.status(200).json(manufacturers)
}
