import {IBedding} from "../../src/interface/iBedding";
import executeQuery from "./MySqlConnect";

export async function getBedding():Promise<IBedding[]>
{

    return  await executeQuery({
            query: 'SELECT * FROM bedding',
            values: []
        });


}

export async function getBeddingById(id:string):Promise<IBedding>
{

    return  await executeQuery({
        query: 'SELECT * FROM bedding WHERE id like ?',
        values: [id]
    });


}

export async function insertBedding(bedding: IBedding): Promise<any>
{
    let res;
    try {
         await executeQuery({
            query: 'INSERT INTO bedding (title, description, image, size, manufacturer, price) values (?,?,?,?,?,?)',
            values: [bedding.title, bedding.description, bedding.image, bedding.size,bedding.manufacturer, bedding.price]
        }).then(data => res=data);
    } catch (e) {
        res = e
    }

    return res
}