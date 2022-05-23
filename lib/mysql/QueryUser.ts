import executeQuery from "./MySqlConnect";
import {IUser} from "../../src/interface/iUser";

export async function getUserByWallet(wallet:string): Promise<IUser[]>{

    return await executeQuery({
        query: 'Select id, wallet, name, email, jwt_token from users WHERE wallet like ?',
        values: [wallet]
    })
}

export async function addUserByWallet(wallet:string): Promise<IUser[]>{

    await executeQuery({
        query: 'INSERT INTO users (wallet) values (?)',
        values: [wallet]
    });

    return await getUserByWallet(wallet);
}

export async function updateUserProfileData(userData:{name:string,email:string,wallet:string}): Promise<IUser[]>{

    await executeQuery({
        query: "UPDATE users SET name='"+userData.name+"', email='"+userData.email+"', wallet='"+userData.wallet+"' where wallet like ?",
        values: [userData.wallet]
    });

    return await getUserByWallet(userData.wallet);
}