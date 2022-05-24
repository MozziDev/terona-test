import {IBedding} from "../../src/interface/iBedding";
import {Box, CircularProgress} from "@mui/material";
import * as React from "react";
import {IAddBaddingProps} from "../../src/interface/iBeddingProps";
import {useEffect, useState} from "react";
import BeddingForm from "../../src/components/BeddingForm";
import BeddingView from "../../src/components/BeddingView";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import {connect} from "react-redux";
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";
import Loading from "../../src/components/Loading";


const Details = ({wallet, query}) => {
    const [editBedding, setEditBedding] = useState(false)
    const [bedding, setBedding] = useState()
    const [manufacturers, setManufacturers] = useState()
    const [sizes, setSizes] = useState()


    const handleChangeEditStatus = () => {
        (editBedding) ? setEditBedding(false) : setEditBedding(true)
    }

    useEffect(() => {
        fetch('/api/get-bedding-by-id?id='+query.id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBedding(data.bedding);
                setManufacturers(data.manufacturers);
                setSizes(data.sizes)
            })
    }, [])

    return <>
        {wallet.isConnect && (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                height: '50px'
            }}
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
            (!bedding) ? (
                    <Loading />
            ) :
            (editBedding) ?
                <BeddingForm bedding={bedding} manufacturers={manufacturers} sizes={sizes} />
                :
                <BeddingView bedding={bedding} manufacturers={manufacturers} sizes={sizes} />
        }
    </>
}


export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            query
        }
    }
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet
    }
}

export default connect(walletStateToProps)(Details);
