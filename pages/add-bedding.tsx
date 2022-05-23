import * as yup from 'yup';
import {IManufacturer} from "../src/interface/iManufacturer";
import {IBeddingSize} from "../src/interface/iBeddingSize";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {IBedding} from "../src/interface/iBedding";
import BeddingForm from "../src/components/BeddingForm";

const Input = styled('input')({
    display: 'none',
});

const validationSchema = yup.object({
    title: yup
        .string()
        .required('Title bedding is required'),
    description: yup
        .string(),
    size: yup
        .number()
        .required('Size is required'),
    manufacturer: yup
        .number()
        .default(0),
    price: yup
        .number()

});

const fileToDataUri = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        // @ts-ignore
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

interface IAddBaddingProps {
    manufacturers: IManufacturer[],
    sizes: IBeddingSize[],
    bedding: IBedding
}

const initialValues = {
    title: '',
    image: '/img/no-images.png',
    size: 0,
    manufacturer: 0,
    price: 0,
    description: ''
}

const AddBedding = ({manufacturers, sizes, bedding = initialValues }:IAddBaddingProps):JSX.Element => {

    return <>
        <BeddingForm manufacturers={manufacturers} sizes={sizes} bedding={bedding}></BeddingForm>
        </>
}

export async function getStaticProps() {
    const urlMan:string = process.env.DOMAIN_NAME+'/api/manufacturers';
    const manufacturers = await(await fetch(urlMan)).json();

    const urlSize:string = process.env.DOMAIN_NAME+'/api/sizes';
    const sizes = await (await fetch(urlSize)).json();

    return {
        props: {
            manufacturers,
            sizes
        }
    }
}


export default AddBedding;