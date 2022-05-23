import * as yup from 'yup';
import {useFormik} from "formik";
import {Container, Grid, MenuItem, Select, TextField} from "@mui/material";
import {IManufacturer} from "../../interface/iManufacturer";
import {IBeddingSize} from "../../interface/iBeddingSize";
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {useState} from "react";
import Image from "next/image";
import {IBedding} from "../../interface/iBedding";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {IAddBaddingProps} from "../../interface/iBeddingProps";

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
        .required('Size is required')
        .default(0),
    manufacturer: yup
        .number()
        .required('Manufacturer is required')
        .default(0),
    price: yup
        .number()
        .default(0)

});

const fileToDataUri = (file: Blob) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        // @ts-ignore
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

const initialValues = {
    title: '',
    image: '/img/no-images.png',
    size: 0,
    manufacturer: 0,
    price: 0,
    description: ''
}

const BeddingForm = ({manufacturers, sizes, bedding}:IAddBaddingProps):JSX.Element => {

    const route = useRouter();
    const [beddingState, setBeddingState] = useState(bedding)
    const [beddingInsert, setBeddingInsert] = useState(false);

    const formik = useFormik({
        initialValues: bedding,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setBeddingInsert(true)

            let url: string;

            (values.id)? url = '/api/update-bedding' : url = '/api/insert-bedding';;

            await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/text'
                },

                body: JSON.stringify(values)
            }).then((res)=>{
                if (res.ok) {
                    toast.success("Successfully!", {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => {
                                setBeddingInsert(false);
                                route.push("/")
                            }
                        }
                    )

                }else {
                    toast.error(res.statusText, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClose: () => {
                            setBeddingInsert(false);
                        }
                    });
                }
            });

            console.log("Formik Value",JSON.stringify(values, null, 2));

        },
    });


    function fullStateChange(element:any): void
    {
        const newState: IBedding = {
            ...beddingState,
            ...element
        }
        setBeddingState(newState);
    }


    const handleChange = (event:any):void=>{
        const element: any = {};
        element[event.target.name] = event.target.value;
        fullStateChange(element)
    }

    const handleCapture = (event:React.ChangeEvent<any>, formik: any)=>{
        const file = event.target.files[0];
        if(!file) {
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                fullStateChange({image: dataUri});
                formik.setFieldValue('image',dataUri)
            })
    }

    return <>
        <Container >
            <form onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={2} sx={{p:2}}>
                    <Grid item md={6} sx={{width: '100%', maxHeight: '200px'}}>
                        <Stack direction="row" alignItems="center" alignContent={'center'} textAlign={'center'} spacing={2} sx={{width: '100%'}}>
                            <label htmlFor="contained-button-file" >
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(event) => handleCapture(event,formik)} />
                                <Button variant="contained" component="span" sx={{minWidth:'250px', mb: 2}} disabled={beddingInsert}>
                                    Upload Image
                                </Button>
                            </label>
                        </Stack>
                        <Image
                            src={formik.values.image}
                            alt = {formik.values.title}
                            width="100%"
                            height="50%"
                            layout='responsive'
                            objectFit='contain'
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title Badding"
                            defaultValue={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={handleChange}
                            disabled={beddingInsert}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            sx={{mb:2}}
                        />
                        <Grid container columnSpacing={2} sx={{mt: 2, mb: 2}}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="price"
                                    name="price"
                                    label="Price"
                                    defaultValue={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={handleChange}
                                    disabled={beddingInsert}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    labelId="manufacturer"
                                    id="manufacturer"
                                    name="manufacturer"
                                    label="manufacturer"
                                    onChange={formik.handleChange}
                                    onBlur={handleChange}
                                    disabled={beddingInsert}
                                    defaultValue={formik.values.manufacturer}
                                    placeholder="Manufacturer"
                                    sx={{width:'100%'}}
                                >
                                    <MenuItem key={0} disabled={true}  value={0}>No manufacturer</MenuItem>
                                    { manufacturers.map((m: IManufacturer)=>{
                                        return <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    labelId="size"
                                    id="size"
                                    name="size"
                                    label="Size"
                                    value={formik.values.size}
                                    onChange={formik.handleChange}
                                    onBlur={handleChange}
                                    disabled={beddingInsert}
                                    sx={{width:'100%'}}
                                >
                                    <MenuItem key={0} disabled={true} value={0}>{'Select Size'}</MenuItem>

                                    { sizes.map((s: IBeddingSize)=>{
                                            return <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
                                        })
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            rows={6}
                            multiline
                            id="description"
                            name="description"
                            label="Description"
                            defaultValue={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={handleChange}
                            disabled={beddingInsert}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            sx={{mt:2, mb:2}}
                        />
                        <Button color="primary" variant="contained" fullWidth sx={{mt:2}} type="submit" disabled={beddingInsert}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>
}

export default BeddingForm;