import executeQuery from "./MySqlConnect";
import {IUser} from "../../src/interface/iUser";

export async function getUserByWallet(wallet:string): Promise<IUser[]>{

    return await executeQuery({
        query: 'Select id, wallet, name, email, jwt_token from users WHERE wallet like ?',
        values: [wallet]
    })
}