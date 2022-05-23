import executeQuery from "./MySqlConnect";
import {IBeddingSize} from "../../src/interface/iBeddingSize";

export async function getSizes(): Promise<IBeddingSize[]>{

    return await executeQuery({
        query: 'Select * from bedding_size',
        values: []
    })
}