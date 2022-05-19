import {Blob} from 'buffer';

export interface IBedding{
    id:number,
    name:string,
    image:Blob,
    size:number,
    manufacturer: number,
    price:number
}