import {IManufacturer} from "./iManufacturer";
import {IBeddingSize} from "./iBeddingSize";
import {IBedding} from "./iBedding";

export interface IAddBaddingProps {
    bedding: IBedding,
    manufacturers: IManufacturer[],
    sizes: IBeddingSize[],
    wallet?: any
}