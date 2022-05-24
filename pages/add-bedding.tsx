import * as yup from 'yup';
import {IManufacturer} from "../src/interface/iManufacturer";
import {IBeddingSize} from "../src/interface/iBeddingSize";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {IBedding} from "../src/interface/iBedding";
import BeddingForm from "../src/components/BeddingForm";
import {useEffect, useState} from "react";
import Loading from "../src/components/Loading";

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

const AddBedding = ({ bedding = initialValues }:IAddBaddingProps):JSX.Element => {

    const [manufacturers, setManufacturers] = useState();
    const [sizes, setSizes] = useState();

    useEffect(() => {
        fetch('/api/manufacturers')
            .then(res => res.json())
            .then(data => {
                setManufacturers(data)
            });

        fetch('/api/sizes')
            .then(res => res.json())
            .then(data => {
                setSizes(data)
            })

    }, [])

    return <>
        {
            (manufacturers && sizes)? <BeddingForm manufacturers={manufacturers} sizes={sizes} bedding={bedding}></BeddingForm>
                : <Loading />
        }

        </>
}

export default AddBedding;