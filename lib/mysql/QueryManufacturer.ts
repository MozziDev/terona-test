import executeQuery from "./MySqlConnect";
import {IManufacturer} from "../../src/interface/iManufacturer";

export async function getManufactures(): Promise<IManufacturer[]>{

    const res =  await executeQuery({
        query: 'Select * from manufacturer',
        values: []
    });

    return res
}