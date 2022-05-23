import {IBedding} from "../../src/interface/iBedding";
import {Box} from "@mui/material";
import * as React from "react";
import {IAddBaddingProps} from "../../src/interface/iBeddingProps";
import {useState} from "react";
import BeddingForm from "../../src/components/BeddingForm";
import BeddingView from "../../src/components/BeddingView";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import {connect} from "react-redux";
import {AppProps} from "next/app";


const Details = ({bedding, manufacturers, sizes, wallet}: IAddBaddingProps) => {
    const [editBedding, setEditBedding] = useState(false)
console.log('wallet', wallet)
    const handleChangeEditStatus = () => {
        (editBedding) ? setEditBedding(false) : setEditBedding(true)
    }

    return <>
        {wallet.isConnect && (
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
                            aria-label="Switch View/Edit"
                        />
                    }
                    label={editBedding ? 'View Bedding' : 'Edit Bedding'}
                />
            </FormGroup>

        </Box>
        )}
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
    return {
        props: {
            bedding: beddingData.bedding,
            manufacturers: beddingData.manufacturers,
            sizes: beddingData.sizes
        },
    }
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet
    }
}

export default connect(walletStateToProps)(Details);
