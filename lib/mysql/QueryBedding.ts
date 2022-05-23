import {IBedding} from "../../src/interface/iBedding";
import executeQuery from "./MySqlConnect";
import {IResultQuery} from "../../src/interface/iResultQuery";

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

export async function insertBedding(bedding: IBedding): Promise<IResultQuery>
{
    let result: IResultQuery;

    const resultQuery: any = await executeQuery({
            query: 'INSERT INTO bedding (title, description, image, size, manufacturer, price) values (?,?,?,?,?,?)',
            values: [bedding.title, bedding.description, bedding.image, bedding.size,bedding.manufacturer, bedding.price]
        })
    if (resultQuery.error) {
        result = {
            status: false,
            text: resultQuery.sqlMessage
        }
    }

    result = {
        status: true,
        text: "This entry has been added!"}

    return result;
}

export async function updateBedding(bedding: IBedding): Promise<IResultQuery>
{
    let result: IResultQuery;

    const resultQuery: any = await executeQuery({
            query: "UPDATE bedding SET  title='"+bedding.title+"', description='"+bedding.description+"', image='"+bedding.image+"', size='"+bedding.size+"', manufacturer='"+bedding.manufacturer+"', price="+bedding.price+" WHERE id like ?",
            values: [bedding.id]
        });

    if (resultQuery.error) {
        result = {
            status: false,
            text: resultQuery.sqlMessage
        }
    }

        result = {
            status: true,
            text: "The record has been updated."
        };

    return result;
}

export async function deleteBedding(id:number): Promise<IResultQuery>
{
    let result: IResultQuery;

    const resultQuery: any = await executeQuery({
        query: "DELETE FROM bedding WHERE id like ?",
        values: [id]
    })

    if (resultQuery.error) {
        result = {
            status: false,
            text: resultQuery.sqlMessage
        }
    }

    result = {
        status: true,
        text: "The record has been deleted."
    };

    return result;
}