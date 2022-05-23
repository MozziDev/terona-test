import {IBedding} from "../../src/interface/iBedding";
import {Box, Button, Link} from "@mui/material";
import Image from "next/image";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {IManufacturer} from "../../src/interface/iManufacturer";
import {IBeddingSize} from "../../src/interface/iBeddingSize";
import {IAddBaddingProps} from "../../src/interface/iBeddingProps";
import {useState} from "react";
import BeddingForm from "../../src/components/BeddingForm";
import BeddingView from "../../src/components/BeddingView";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";


const Details = ({bedding, manufacturers, sizes}: IAddBaddingProps) => {
    const [editBedding, setEditBedding] = useState(false)

    const handleChangeEditStatus = () => {
        (editBedding) ? setEditBedding(false) : setEditBedding(true)
    }

    return <>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                height: '50px'
            }}
            onClick={()=>{console.log("1")}}
        >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={editBedding}
                            onChange={handleChangeEditStatus}
                            aria-label="login switch"
                        />
                    }
                    label={editBedding ? 'View Bedding' : 'Edit Bedding'}
                />
            </FormGroup>
        </Box>
        {
            (editBedding) ?
                <BeddingForm bedding={bedding} manufacturers={manufacturers} sizes={sizes} />
                :
                <BeddingView bedding={bedding} manufacturers={manufacturers} sizes={sizes} />
        }
    </>
}

export const getStaticPaths = async () => {
    const urlBed:string = process.env.DOMAIN_NAME+'/api/get-bedding';
    const res = await fetch(urlBed)
    const beddings: IBedding[] = await res.json()

    const paths = beddings.map((bedding: IBedding) => {
        return {
            // @ts-ignore
            params: { id: bedding.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}: any)=>{
    const urlBed =  process.env.DOMAIN_NAME+'/api/get-bedding-by-id?id='+params.id;
    const res = await fetch(urlBed)
    const beddingData = await res.json()
    console.log(beddingData)
    return {
        props: {
            bedding: beddingData.bedding,
            manufacturers: beddingData.manufacturers,
            sizes: beddingData.sizes
        },
    }
}

export default Details;