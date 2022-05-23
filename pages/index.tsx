import type { NextPage } from 'next'
import {Container, Grid, Rating} from "@mui/material";
import {IBedding} from "../src/interface/iBedding";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import EuroIcon from '@mui/icons-material/Euro';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Link from "next/link";
import {deleteBedding} from "../lib/mysql/QueryBedding";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Home = ({beddings}: IBedding[]) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id: number) => {
    console.log(id)
  }
  let allBeddings: JSX.Element;
  if (beddings.length) {
    allBeddings = beddings.map((bedding: IBedding)=>{
      return <Grid key={bedding.id} item xs={3}>
                <Card key={bedding.id} sx={{ maxWidth: 345 }}>
                  <CardHeader
                      title={<Link href={"/detail/"+bedding.id}>{bedding.title}</Link>}

                      action={<>
                          <IconButton aria-label="share">
                              <ShareIcon />
                          </IconButton>
                          <IconButton aria-label="share" onClick={()=>handleDelete(bedding.id)} >
                            <ModeEditIcon/>
                          </IconButton>
                      </>
                      }
                  />
                  <CardMedia
                      component="img"
                      height="194"
                      image={bedding.image}
                      alt={bedding.title}
                  />
                  <CardActions disableSpacing sx={{mt:2}}>
                    <Rating name="size-medium" readOnly defaultValue={5} />
                    <Typography sx={{ marginLeft: 'auto', mr:1}}>
                      Price: {bedding.price}
                    </Typography>
                    <EuroIcon/>
                  </CardActions>
                </Card>
      </Grid>
    })
  }
  return (
      <>
        <Container fixed  maxWidth="xl" >
        <Grid container spacing={2} sx={{mt: 4, width:'100%'}} alignItems={'center'} alignContent={'center'}>
                {allBeddings}
        </Grid>
        </Container>
      </>
  )
}

export async function getStaticProps() {
  const urlBed:string = process.env.DOMAIN_NAME+'/api/get-bedding';

  const res = await fetch(urlBed)
  const beddings: IBedding[] = await res.json()

  return {
    props: {
      beddings,
    },
  }
}

export default Home
