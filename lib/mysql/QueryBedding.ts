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
    const res:[IBedding]  = await executeQuery({
        query: 'SELECT * FROM bedding WHERE id like ?',
        values: [id]
    });
    return res[0];


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

export async function updateBedding(bedding: IBedding): Promise<any>
{
    let res;
    try {
        await executeQuery({
            query: "UPDATE bedding SET  title='"+bedding.title+"', description='"+bedding.description+"', image='"+bedding.image+"', size='"+bedding.size+"', manufacturer='"+bedding.manufacturer+"', price="+bedding.price+" WHERE id like ?",
            values: [bedding.id]
        }).then(data => res=data);
    } catch (e) {
        res = e
    }

    return res
}

export async function deleteBedding(id:number): Promise<any>
{
    let res;
    try {
        await executeQuery({
            query: "DELETE FROM bedding WHERE id like ?",
            values: [id]
        }).then(data => res=data);
    } catch (e) {
        res = e
    }

    return res
}