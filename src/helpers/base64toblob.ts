import {getTypeFileHelper} from "./getTypeFile";

export const base64ToBlobHelper = (base63String:string)=>{
    const typeFile = getTypeFileHelper(base63String);

    return new Blob([base63String], { type: typeFile as string });
}