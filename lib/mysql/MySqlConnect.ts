import mysql from 'serverless-mysql';

export interface iQuery {
    query: string,
    values: any
}
const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD  }});

export default async function executeQuery({ query, values }: iQuery): Promise<any> {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        console.log(error)
        return { error };
    }}