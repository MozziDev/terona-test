import {IManufacturer} from "../../interface/iManufacturer";
import {IBeddingSize} from "../../interface/iBeddingSize";
import {Grid} from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {IAddBaddingProps} from "../../interface/iBeddingProps";

const BeddingView = ({manufacturers, sizes, bedding}:IAddBaddingProps):JSX.Element =>{
    const manufacturer:IManufacturer[] = manufacturers.filter((man:IManufacturer)=>{
        if (man.id === bedding.manufacturer) {
            return man
        }
        return ;
    })
    const size: IBeddingSize[] = sizes.filter((sizeEl:IBeddingSize)=>{
        if(sizeEl.id === bedding.size){
            return sizeEl
        }
        return ;
    })
    return<>
        <Grid container columnSpacing={2} sx={{p:2}}>
            <Grid item md={6} sx={{width: '100%', minHeight: '200px'}}>
                <Image
                    src={bedding.image}
                    width="100%"
                    height="50%"
                    layout='responsive'
                    objectFit='contain'
                />
            </Grid>
            <Grid item md={6}>
                <Typography  component={'h1'} >{bedding.title}</Typography>
                <Grid container columnSpacing={2} sx={{mt: 2, mb: 2}}>
                    <Grid item xs={4}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Price (Eur):
                        </Typography>
                        <Typography>{bedding.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Manufacturer:
                        </Typography>
                        <Typography>{(manufacturer[0]) ? manufacturer[0].name : "Unknown"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Size:
                        </Typography>
                        <Typography>{(size[0]) ? size[0].title : "Unknown"}</Typography>
                    </Grid>
                </Grid>
                <Typography>{bedding.description}</Typography>
            </Grid>
        </Grid>
    </>
}

export default BeddingView;